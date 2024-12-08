export default function decorate(block) {
    // 1. Create navigation buttons
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    prevBtn.classList.add('carousel-prev');
    nextBtn.classList.add('carousel-next');
    prevBtn.innerHTML = '←';
    nextBtn.innerHTML = '→';
  
    // 2. Create slides container
    const slidesContainer = document.createElement('div');
    slidesContainer.classList.add('carousel-slides');
  
    // 3. Process slides
    const slides = [...block.children];
    slides.forEach((slide, index) => {
      slide.classList.add('carousel-slide');
      slide.setAttribute('data-slide-index', index);
      slidesContainer.appendChild(slide);
    });
  
    // 4. Clear and rebuild block content
    block.textContent = '';
    block.appendChild(prevBtn);
    block.appendChild(slidesContainer);
    block.appendChild(nextBtn);
  
    // 5. Initialize state
    let currentSlide = 0;
    const totalSlides = slides.length;
  
    // 6. Update slide visibility
    function updateSlides() {
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    }
  
    // 7. Navigation functions
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlides();
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlides();
    }
  
    // 8. Add event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
  
    // 9. Add touch support
    let touchStartX = 0;
    let touchEndX = 0;
  
    block.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
  
    block.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
      }
    });
  
    // 10. Initialize first slide
    updateSlides();
  
    // 11. Optional: Auto-play
    let autoplayInterval;
    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
  
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }
  
    // Start autoplay and handle pause on hover
    startAutoplay();
    block.addEventListener('mouseenter', stopAutoplay);
    block.addEventListener('mouseleave', startAutoplay);
  }