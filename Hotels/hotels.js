function mergeSort(cards, compareFunction) {
    if (cards.length <= 1) {
        return cards;
    }

    const middle = Math.floor(cards.length / 2);
    const left = cards.slice(0, middle);
    const right = cards.slice(middle);

    return merge(
        mergeSort(left, compareFunction),
        mergeSort(right, compareFunction),
        compareFunction
    );
}

function merge(left, right, compareFunction) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (compareFunction(left[leftIndex], right[rightIndex]) <= 0) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function sortByPrice(cards, order) {
    return mergeSort(cards, function(a, b) {
        const priceA = parseInt(a.querySelector('b').innerText.replace('Price:₹', '').trim());
        const priceB = parseInt(b.querySelector('b').innerText.replace('Price:₹', '').trim());

        if (order === 'lowtohigh') {
            return priceA - priceB;
        } else if (order === 'hightolow') {
            return priceB - priceA;
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const sortDropdown = document.getElementById('sortDropdown');
    const cardsContainer = document.querySelector('.grid-container');
    const cards = Array.from(cardsContainer.querySelectorAll('.card'));

    sortDropdown.addEventListener('change', function() {
        const selectedValue = this.value;
        const sortedCards = sortByPrice(cards, selectedValue);

        sortedCards.forEach(function(card) {
            cardsContainer.appendChild(card);
        });
    });
});
