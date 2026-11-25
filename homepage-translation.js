const text = [
    [['about-me-header'],'about me','à propos de moi','según mí','મારી વિશે','ymbe mē'],
    [['hello-text'],'hello, I\'m Eshaan Patel','bonjour, j\'suis Esha Patel','hola, soy Esha Patel','કેમ છે, હું ઈશાન પટેલ છું.','wilcume! iċ eom Īsċa Pœttel.'],
    [['description-text'],'I make conlangs, program, and hope to pursue linguistics.','je crée des conlangs, programme, et espère poursuivre la linguistique.','yo creo conlangs, programo la computadora, y espero que podré porseguir la lingüística.','હું નવા ભાષાઓ બનાવતી હઉ છું, કમ્પ્યૂટર માટે પ્રોગ્રામો બનાવતી હઉ છું, અને હું મોટી થઉ ત્યારે મને ભાષાશાસ્ત્ર ભણું છે.','iċ wyrċe on ġeworhte sprǣċa, reccenere-wyrċinga, ænd sœ̄ċe wyrċan in sprǣċlār.'],
    [['ongoing-projects'],'ongoing projects','projets en cours','proyectos incompletos','ચાલતાં કામો','weorc hæfd nū'],
    [['blogger-title'],'recent blog posts','articles récentes du blog','publicaciones recientes del blog','બ્લૉગની સૌથી નવા પોસ્ટો','nīewe wēblogges word'],
    [['blog-nav-item'],'blog','blog','blog','બ્લૉગ','wēblog'],
    [['bio-nav-item'],'bio','bio','bio','મારી વિશે','ymbe mē'],
    [['blog-title'],'<blink>esha\'s</blink>&nbsp;<blunk>website</blunk>','<blunk>site web de</blunk>&nbsp;<blink>esha</blink>','<blunk>sitio web de</blunk>&nbsp;<blink>esha</blink>','<blink>ઈશાન ની</blink>&nbsp;<blunk>વેબ સાઇટ</blunk>','<blink>īsċan</blink>&nbsp;<blunk>wēbstede</blunk>'],
    [['tab-title'],'esha\'s website','site web de esha','sitio web de esha','ઈશ ની વેબ સાઇટ','īsċan wēbstede'],
    [['project-section-header','projects-nav-item'],'projects','projets','proyectos','કામો','weorc'],
    [['programming-tab-text','programming-header-text'],'programming','programmation','programación','કમ્પ્યૂટરના પ્રોગ્રામો','wyrċing þȳ reccenere'],
    [['conlang-tab-text','conlangs-header-text'],'conlangs','conlangs','conlangs','conlangઓ','ġeworhte sprǣċa'],
    doubleton('conlangs-blurb','here are some conlangs I\'ve created:','voici quelques conlangs créées par moi:','aquí tienes unas conlangs que yo he creado:','મેં આ બધા ભાષાઓ બનવ્યેલી છું:','under þissum cwide liċġaþ sum sprǣċa hwelċ iċ worhte:'),
    doubleton('conlangs-blurb','here are some conlangs I\'ve created:','voici quelques conlangs créées par moi:','aquí tienes unas conlangs que yo he creado:','મેં આ બધા ભાષાઓ બનવ્યેલી છું:','under þissum cwide liċġaþ sum sprǣċa hwelċ iċ worhte:'),
    [['music-tab-text','music-header-text'],'music','musique','música','સંગીત','sōncræft'],
    doubleton('t-language','Language','Langue','Idioma','ભાષા','Sprǣċ'),
    doubleton('t-family','Family','Famille','Familia','ફૅમિલી','Cynn'),
    [['t-description','music-description','programming-description'],'Description','Description','Descripción','વર્ણન','Tācn'],
    doubleton('t-sentence-translation-gloss','Sentence/Translation/Gloss','Phrase/Traduction/Glosse','Frase/Traducción/Glosa','વાક્ય/ગુજરાતી/ગ્લૉસ','Cwide/Ġehweorfanne/Ġehweorfan mid Tācne'),
    doubleton('t-creation-time','Creation Time','Temps Pris pour Créer','Tiempo Tomado para Creer','બનાવા માટે ની સમય', 'Tīd Ġetacen Wyrċende'),
    doubleton('t-word-order','Word Order','Ordre des Mots','Orden de Palabras','શબ્દોની જગ્યાઓ','strenġ'),
    doubleton('t-morphosyn','<abbr title="Morphosyntactic">Morph.</abbr> Alignment','Alignement <abbr title="Morphosyntactique">Morpho.</abbr>','Alineación <abbr title="Morfosintáctico">Morfo.</abbr>','<abbr title="મોર્ફોસિન્ટૅક્ટિક">મોર્ફો.</abbr> ગોઠવણી','Wordstōwiunga ġereġniung'),
    doubleton('t-cases','Cases','Cas','Casos','વિભકતિ','Fiell'),
    doubleton('programming-function','Function','Fonction','Función','કામ','Weorc'),
    doubleton('programming-application','App','Appli','App','ઍપ','Reccenere-wyrċiung'),
];
function doubleton(id,en,fr,es,gu,ang) {
    return [[id],en,fr,es,gu,ang];
}
function singleton(id,name) {
    return doubleton(id,name,name,name,name,name);
}
function chooseLanguage(langIndex) {
    for (let a of text) {
        for (let b of a[0]) document.querySelector('#' + b).innerHTML = a[langIndex];
    }
}

function updateLanguage() {
    switch (document.querySelector('#langSelect').value) {
        case 'fr':
            chooseLanguage(2);
            break;
        case 'es':
            chooseLanguage(3);
            break;
        case 'gu':
            chooseLanguage(4);
            break;
        case 'ang':
            chooseLanguage(5);
            break;
        default:
            chooseLanguage(1);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.querySelector('#langSelect');

    // Load previously selected language
    const savedLanguage = localStorage.getItem('language') || 'en';
    langSelect.value = savedLanguage;

    updateLanguage();

    // Save language whenever changed
    langSelect.addEventListener('change', () => {
        localStorage.setItem('language', langSelect.value);
        updateLanguage();
    });
});