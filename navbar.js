// Navbar functionality
      document.addEventListener('DOMContentLoaded', function() {
        // Select home tab
        const navItems = document.querySelectorAll('.nav-item');
        const contentSections = document.querySelectorAll('.content-section');
        
        // Function to handle nav item clicks
        function handleNavClick(event) {
          const targetId = this.getAttribute('data-target');
          
          // Hide all content sections
          contentSections.forEach(section => {
            section.classList.remove('active');
          });
          
          // Show the targeted section
          document.querySelector(targetId).classList.add('active');
          
          // Reset all nav items
          navItems.forEach(item => {
            item.style.transform = 'translateY(0)';
            item.style.background = 'transparent';
          });
          
          // Style the clicked nav item
          this.style.background = 'rgba(155,130,155,0.3)';
          //this.style.transform = 'translateY(-5px)';

          history.pushState(null, '', `${targetId}`);
        }
        
        // Add click event to each nav item
        navItems.forEach(item => {
          item.addEventListener('click', handleNavClick);
        });
        const targetNav = window.location.hash === '#projects'
            ? document.querySelector('.nav-item[data-target="#projects"]')
            : document.querySelector('.nav-item');
        if (targetNav) targetNav.click();
        
        
        // Projects
        // Select home tab
        const gravItems = document.querySelectorAll('.grav-item');
        const grontentSections = document.querySelectorAll('.grontent-section');

        function handleGravClick() {
            const targetId = this.getAttribute('data-target');

            grontentSections.forEach(s => s.classList.remove('active'));
            const targetSection = document.querySelector(`#${targetId}`);
            if(targetSection) targetSection.classList.add('active');

            gravItems.forEach(item => {
                item.style.filter = '';
            });
            this.style.filter = 'brightness(1.6)';

            // Update URL hash
           //history.pushState(null, '', `#${targetId}`);
        }

        gravItems.forEach(item => item.addEventListener('click', handleGravClick));

        // Click first grav-item by default
        if (gravItems.length) gravItems[0].click();
      });
      
      // Settings Manager
      const SettingsManager = {
        init() {
          this.loadSettings();
          this.bindEvents();
          this.toggleCalculatorIcon(
            localStorage.getItem("showCalculator") === "true"
          );
          this.togglePerformanceMode(
            localStorage.getItem("performanceMode") === "true"
          );
        },

        bindEvents() {
          $("#cookie-consent").change(function () {
            localStorage.setItem("cookieConsent", this.checked);
            if (this.checked)
              document.cookie = "cookieConsent=true; max-age=2592000";
          });

          $("#calculator-toggle").change(function () {
            localStorage.setItem("showCalculator", this.checked);
            SettingsManager.toggleCalculatorIcon(this.checked);
          });

          $("#performance-mode").change(function () {
            localStorage.setItem("performanceMode", this.checked);
            SettingsManager.togglePerformanceMode(this.checked);
          });
        },

        loadSettings() {
          const consent = document.cookie.includes("cookieConsent=true");
          $("#cookie-consent").prop("checked", consent);

          $("#calculator-toggle").prop(
            "checked",
            localStorage.getItem("showCalculator") === "true"
          );

          $("#performance-mode").prop(
            "checked",
            localStorage.getItem("performanceMode") === "true"
          );
        },

        toggleCalculatorIcon(show) {
          $('[data-target="#calculator"]').toggle(show);
        },

        togglePerformanceMode(enable) {
          $("body").toggleClass("flattened", enable);
          $("#desmos-calculator").css("opacity", enable ? 0.9 : 1);
        },
      };

      $(document).ready(function () {
        SettingsManager.init();

        var channelID = "UCEvttHNVOsafen6uySQbDkQ";
        var reqURL = "https://www.youtube.com/feeds/videos.xml?channel_id=";
        $.getJSON("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(reqURL)+channelID, function(data) {
           var link = data.items[0].link;
           var id = link.substr(link.indexOf("=")+1);
        $("#youtube_video").attr("src","https://youtube.com/embed/"+id + "?controls=0&showinfo=0&rel=0");
        });
      });
      
      const blogURL = "https://blog.aeonic.me/feeds/posts/default?alt=json-in-script&orderby=updated&max-results=1&callback=displayPost";

  function displayPost(data) {
  const entry = data.feed.entry[0];
  const title = entry.title.$t;
  const link = entry.link.find(l => l.rel === 'alternate').href;
  const htmlContent = entry.content ? entry.content.$t : entry.summary.$t;

  // Create a temporary DOM element to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  // Find the first .content-section
  const firstSection = tempDiv.querySelector('.post-summary');

  // Convert it to plain text (or empty string if not found)
  const plainText = firstSection ? firstSection.textContent.trim() : '';

  // Put into page
  document.getElementById('latest-post').innerHTML = `
    <h3><a href="${link}" target="_blank">${title}</a></h3>
    <div>${plainText}</div>
  `;
}

// Inject the JSONP script
const script = document.createElement('script');
script.src = blogURL;
document.body.appendChild(script);