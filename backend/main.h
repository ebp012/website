#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <libxml/parser.h>
#include <libxml/tree.h>

/* Read an entire file into a dynamically allocated string. */
char *read_file(const char *path) {
    FILE *file = fopen(path, "rb");
    if (!file) return NULL;

    fseek(file, 0, SEEK_END);
    long size = ftell(file);
    rewind(file);

    char *buffer = malloc(size + 1);
    if (!buffer) {
        fclose(file);
        return NULL;
    }

    fread(buffer, 1, size, file);
    buffer[size] = '\0';

    fclose(file);
    return buffer;
}

/* Replace every occurrence of a substring with another string. */
char *replace_string(const char *original, const char *target,
                     const char *replacement) {
    if (!original || !target || !replacement || !*target) return NULL;

    size_t target_len = strlen(target);
    size_t replacement_len = strlen(replacement);

    size_t count = 0;
    const char *p = original;

    while ((p = strstr(p, target))) {
        count++;
        p += target_len;
    }

    size_t new_len = strlen(original)
                   + count * (replacement_len - target_len) + 1;

    /* Handle replacements that make the string shorter. */
    if (replacement_len < target_len)
        new_len = strlen(original) - count * (target_len - replacement_len) + 1;

    char *result = malloc(new_len);
    if (!result) return NULL;

    char *out = result;
    p = original;
    const char *match;

    while ((match = strstr(p, target))) {
        size_t length = match - p;

        memcpy(out, p, length);
        out += length;

        memcpy(out, replacement, replacement_len);
        out += replacement_len;

        p = match + target_len;
    }

    strcpy(out, p);

    return result;
}

/* Get the text content of an XML element. */
char *get_xml_value(xmlNode *root, const char *tag) {
    xmlNode *node = root->children;

    while (node) {
        if (node->type == XML_ELEMENT_NODE &&
            xmlStrcmp(node->name, (const xmlChar *)tag) == 0) {
            return (char *)xmlNodeGetContent(node);
        }

        node = node->next;
    }

    return "";
}

/**
    generates the final HTML string
    @param *metadata is the XML file
    @param *content is the HTML content
 */
char *generate_page(const char *metadata, const char *content) {
    /* 1–2. Read the template. */
    char *html = read_file("../templates/independentpage.htm");
    if (!html) return NULL;

    /* 3–4. Parse metadata XML. */
    xmlDoc *doc = xmlReadFile(metadata, NULL, 0);
    if (!doc) {
        free(html);
        return NULL;
    }

    xmlNode *root = xmlDocGetRootElement(doc);

    char *title = get_xml_value(root, "title");
    char *pagetitle = get_xml_value(root, "pagetitle");

    char *temp;

    temp = replace_string(html, "$TITLE", title);
    free(html);
    html = temp;

    temp = replace_string(html, "$PAGETITLE", pagetitle);
    free(html);
    html = temp;

    /* 5. Construct the table of contents links. */
    char *q = malloc(2);
    strcpy(q, "•");

    xmlNode *toc = root->children;

    while (toc) {
        if (toc->type == XML_ELEMENT_NODE &&
            xmlStrcmp(toc->name, (const xmlChar *)"toc") == 0) {

            for (xmlNode *node = toc->children; node; node = node->next) {
                if (node->type == XML_ELEMENT_NODE &&
                    xmlStrcmp(node->name, (const xmlChar *)"a") == 0) {

                    xmlBuffer *buffer = xmlBufferCreate();
                    xmlNodeDump(buffer, doc, node, 0, 0);

                    size_t old_len = strlen(q);
                    size_t link_len = xmlBufferLength(buffer);

                    q = realloc(q, old_len + link_len + 2);

                    memcpy(q + old_len, xmlBufferContent(buffer), link_len);
                    q[old_len + link_len] = '•';
                    q[old_len + link_len + 1] = '\0';

                    xmlBufferFree(buffer);
                }
            }
        }

        toc = toc->next;
    }

    /* 6. Replace $LINKS. */
    temp = replace_string(html, "$LINKS", q);
    free(html);
    html = temp;
    free(q);

    /* 7. Replace $CONTENT. */
    char *body = read_file(content);
    if (!body) {
        free(html);
        xmlFreeDoc(doc);
        return NULL;
    }

    temp = replace_string(html, "$CONTENT", body);
    free(html);
    free(body);
    html = temp;

    /* 8. Return the resulting HTML. */
    xmlFreeDoc(doc);

    return html;
}