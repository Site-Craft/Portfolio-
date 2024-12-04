// Select menu toggle button, nav-links, and main content
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const mainContent = document.querySelector('.main-content');

// Toggle the menu visibility and shift main content down
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');

    if (navLinks.classList.contains('show')) {
        // Shift the content down when menu is shown
        mainContent.style.paddingTop = '200px'; // Adjust this value as needed
    } else {
        // Reset content position when menu is hidden
        mainContent.style.paddingTop = '20px';
    }
});






const swiper = new Swiper('.swiper', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 1,
            spaceBetween: 20,
            autoplay: {
                delay: 3000,
            },
        });
        
        
        
        
       
const token = '7792387054:AAGzd6eiWK-uAqGj0G5P7of1f96dRawZVkQ';
    const chatId = '6185254318';

    document.getElementById('contactForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;

      let countryName = '';
      let countryCode = '';

      try {
        const ipInfoResponse = await fetch('https://ipinfo.io?token=aaad8e9b2f8309');
        const ipInfo = await ipInfoResponse.json();
        const country = ipInfo.country;

        const countryInfoResponse = await fetch(`https://restcountries.com/v3.1/alpha/${country}`);
        const countryInfo = await countryInfoResponse.json();
        
        countryName = countryInfo[0].name.common;
        countryCode = countryInfo[0].idd.root + countryInfo[0].idd.suffixes[0];
      } catch (error) {
        console.error('Error fetching country info:', error);
      }

      const text = `
*𓆩𓆩 𝚈𝙾𝚄 𝙷𝙰𝚅𝙴 𝙰 𝙽𝙴𝚆 𝙷𝙸𝚁𝙴 ツ.𓆪𓆪*\n
🐉⊚---------------------------------⊚🐉
*👤Name:* \`${name}\`\n
*📧Email:* \`${email}\`\n
*📱Phone:* \`${phone}\`\n
*📝Message:* ${message}\n
*🗺️Country:* ${countryName}\n
*📟Phone Code:* ${countryCode}
🐉⊚---------------------------------⊚🐉
      `;

      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown'
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          document.getElementById('contactForm').reset();
          const successImage = document.getElementById('successImage');
          successImage.style.display = 'block'; // Show the image

          // Hide the image after 3 seconds (1800 milliseconds)
          setTimeout(() => {
            successImage.style.display = 'none';
          }, 1800);
        } else {
          alert('Error sending message.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error sending message.');
      });
    })
           