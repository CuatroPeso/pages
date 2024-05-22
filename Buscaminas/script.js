document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("minesweeper");
    const width = 10;
    const height = 10;
    const mineCount = 20;
    const cells = [];
    let gameOver = false;

    function createBoard() {
        const mineArray = Array(mineCount).fill("mine");
        const emptyArray = Array(width * height - mineCount).fill("empty");
        const gameArray = emptyArray.concat(mineArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

        for (let i = 0; i < width * height; i++) {
            const cell = document.createElement("div");
            cell.setAttribute("id", i);
            cell.classList.add("cell");
            cell.addEventListener("click", () => clickCell(cell));
            cell.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                flagCell(cell);
            });
            grid.appendChild(cell);
            cells.push(cell);

            if (shuffledArray[i] === "mine") {
                cell.dataset.mine = true;
            }
        }

        for (let i = 0; i < cells.length; i++) {
            const total = calculateMines(i);
            if (total > 0) {
                cells[i].dataset.total = total;
            }
        }
    }

    function calculateMines(index) {
        const isLeftEdge = (index % width === 0);
        const isRightEdge = (index % width === width - 1);
        let total = 0;

        if (cells[index].dataset.mine) return -1;

        [-1, 1, -width, width, -width - 1, -width + 1, width - 1, width + 1].forEach(offset => {
            const newIndex = index + offset;
            if (newIndex >= 0 && newIndex < width * height) {
                if ((isLeftEdge && (offset === -1 || offset === -width - 1 || offset === width - 1)) ||
                    (isRightEdge && (offset === 1 || offset === -width + 1 || offset === width + 1))) {
                    return;
                }
                if (cells[newIndex].dataset.mine) {
                    total++;
                }
            }
        });
        return total;
    }

    function clickCell(cell) {
        if (gameOver || cell.classList.contains("revealed") || cell.classList.contains("flag")) return;

        if (cell.dataset.mine) {
            gameOver = true;
            cells.forEach(cell => {
                if (cell.dataset.mine) {
                    cell.classList.add("revealed", "mine");
                }
            });
            alert("Game Over! You hit a mine.");
            return;
        }

        cell.classList.add("revealed");

        if (cell.dataset.total) {
            cell.classList.add("number");
            cell.innerText = cell.dataset.total;
        } else {
            revealEmptyCells(cell);
        }
    }

    function revealEmptyCells(cell) {
        const index = parseInt(cell.id);
        const isLeftEdge = (index % width === 0);
        const isRightEdge = (index % width === width - 1);

        [-1, 1, -width, width, -width - 1, -width + 1, width - 1, width + 1].forEach(offset => {
            const newIndex = index + offset;
            if (newIndex >= 0 && newIndex < width * height) {
                if ((isLeftEdge && (offset === -1 || offset === -width - 1 || offset === width - 1)) ||
                    (isRightEdge && (offset === 1 || offset === -width + 1 || offset === width + 1))) {
                    return;
                }
                const newCell = cells[newIndex];
                if (!newCell.classList.contains("revealed") && !newCell.classList.contains("flag")) {
                    clickCell(newCell);
                }
            }
        });
    }

    function flagCell(cell) {
        if (gameOver || cell.classList.contains("revealed")) return;

        if (cell.classList.contains("flag")) {
            cell.classList.remove("flag");
        } else {
            cell.classList.add("flag");
        }
    }

    createBoard();
});
