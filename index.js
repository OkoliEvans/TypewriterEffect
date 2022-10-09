
class Typewriter {
  constructor(textElement, words, wait = 2000) {
    this.textElement = textElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10)
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;

    //get fullText of current word
    const fullText = this.words[current]
    
    //check if deleting using isDeleting initialized above
    if (this.isDeleting) {
      // remove character
    this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
      // add character
      this.txt = fullText.substring(0, this.txt.length + 1);
    }

    // add txt into element
    this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    
    //set type speed
    let typeSpeed = 300;

    if(this.isDeleting) {
      typeSpeed /= 2;
    }

    // if word is complete
    if(!this.isDeleting && this.txt === fullText) {
      // pause a bit before start deleting
      typeSpeed = this.wait;
      //start deleting 
      this.isDeleting = true;
    } else {
      if(this.isDeleting && this.txt === '') {
        // stop deleting
        this.isDeleting = false
        //move to the next word
        this.wordIndex++;
        // pause a bit before start typing
        typeSpeed = 500
      }
    }


    setTimeout(() => this.type(), typeSpeed);
  }
}


//init on DOM load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const textElement = document.querySelector('.text-type');
  const words = JSON.parse(textElement.getAttribute('data-words'));
  const wait = textElement.getAttribute('data-wait');

  // init Typewriter
  new Typewriter(textElement, words, wait);
}