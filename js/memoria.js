"use strict";

const data_state_values = {
  REVEALED: "revealed",
  FLIP: "flip",
  INIT: "init",
};

class Memoria {
  elements = {
    elements: [
      {
        element: "HTML5",
        source:
          "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg",
      },
      {
        element: "CSS3",
        source:
          "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg",
      },
      {
        element: "JS",
        source:
          "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg",
      },
      {
        element: "PHP",
        source:
          "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
      },
      {
        element: "SVG",
        source:
          "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg",
      },
      {
        element: "W3C",
        source:
          "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg",
      },
      {
        element: "HTML5",
        source:
          "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg",
      },
      {
        element: "CSS3",
        source:
          "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg",
      },
      {
        element: "JS",
        source:
          "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg",
      },
      {
        element: "PHP",
        source:
          "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
      },
      {
        element: "SVG",
        source:
          "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg",
      },
      {
        element: "W3C",
        source:
          "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg",
      },
    ],
  };

  hasFlippedCards; //is any card flipped?
  lockBoard; //is board locked to user interaction?
  firstCard; //card which started interaction
  secondCard; //second flipped card

  constructor() {
    this.hasFlippedCards = false;
    this.lockBoard = false;
    this.firstCard = null;
    this.secondCard = null;
    this.shuffleElements();
    this.createElements();
    this.addEventListeners();
  }

  unflipCards() {
    this.lockBoard = true;

    setTimeout(() => {
      this.firstCard.setAttribute("data-state", data_state_values.INIT);
      this.secondCard.setAttribute("data-state", data_state_values.INIT);
      this.resetBoard();
    }, 500);
  }

  shuffleElements() {
    for (let i = this.elements.elements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Fisher-yates
      [this.elements.elements[i], this.elements.elements[j]] = [
        this.elements.elements[j],
        this.elements.elements[i],
      ];
    }
  }

  resetBoard() {
    this.firstCard = null;
    this.secondCard = null;
    this.hasFlippedCards = false;
    this.lockBoard = false;
  }

  checkForMatch() {
    if (
      this.firstCard.getAttribute("data-element") ===
      this.secondCard.getAttribute("data-element")
    ) {
      this.disableCards();
    } else {
      this.unflipCards();
    }

    if (this.checkWin()) {
      alert("Has ganado!!!");
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  }

  checkWin() {
    // Obtener todos los elementos article
    var elementosArticle = document.querySelectorAll("article");

    // Utilizar el método every para verificar cada elemento
    var todosRevealed = Array.from(elementosArticle).every(function (elemento) {
      return elemento.getAttribute("data-state") === "revealed";
    });

    // Devolver el resultado
    return todosRevealed;
  }

  disableCards() {
    this.firstCard.setAttribute("data-state", data_state_values.REVEALED);
    this.secondCard.setAttribute("data-state", data_state_values.REVEALED);
    this.resetBoard();
  }

  createElements() {
    this.elements.elements.forEach((element) => {
      // Nodo article para representar la tarjeta
      const card = document.createElement("article");

      //Atributo
      card.setAttribute("data-element", element.element);
      card.setAttribute("data-state", data_state_values.INIT);

      //Heading
      const cardHeading = document.createElement("h3");
      cardHeading.textContent = "Tarjeta de memoria";
      card.appendChild(cardHeading);

      //Imagen
      const cardImage = document.createElement("img");
      cardImage.src = element.source;
      cardImage.alt = element.element;
      card.appendChild(cardImage);

      document.getElementsByTagName("main")[0].appendChild(card);
    });
  }

  addEventListeners() {
    const articles = Array.from(document.querySelectorAll("article"));

    articles.forEach((card) => {
      card.addEventListener("click", this.flipCard.bind(this, card));
    });
  }

  flipCard(_clickedCard) {
    //llamandolo con bind el this es el objeto memoria
    if (this.firstCard == null) {
      this.firstCard = _clickedCard;
      this.firstCard.setAttribute("data-state", data_state_values.FLIP);

      return;
    }

    if (this.secondCard == null) {
      this.secondCard = _clickedCard;
      this.secondCard.setAttribute("data-state", data_state_values.FLIP);
    }

    if (this.firstCard != null && this.secondCard != null) {
      this.checkForMatch();
    }
  }
}
