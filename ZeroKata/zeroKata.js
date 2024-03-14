    //    0       1        2
    // ------|--------|----------
    //    3       4        5
    // ------|--------|----------
    //    6       7       8
    // ------|--------|----------


    const chooseCombination = [
        [0 , 1 , 2],
        [3 , 4 , 5],
        [6 , 7 , 8],
        [0 , 3 , 6],
        [1 , 4 , 7],
        [2 , 5 , 8],
        [0 , 4 , 8],
        [2 , 4 , 6]
    ]    

    let crossOrZero = 'O';

    const result = document.querySelector('.result');
    const restartBtn = document.querySelector("#restart");
    let cells = document.querySelectorAll('.cell')
    cells = Array.from(cells);

    function cellData() {
        if(crossOrZero === 'O') {
            crossOrZero = 'X'
            return 'O';
        } else {
            crossOrZero = 'O'
            return 'X';
        }
    }

    restartBtn.addEventListener('click' , () => window.location.reload())


    const checkTheWinner = (cell) => {

        chooseCombination.forEach(arr => {
            const ans = arr.every(elem => {
                return cells[elem].id === cell.id;
            })
            if(ans === true) {
                result.classList.remove('inactive')  
                console.log('wineer');
            } 
        })

    }

    cells.forEach(cell => {
        cell.addEventListener('click' , () => {
            let cellDataFunctionAns = cellData()
            cell.setAttribute('id' , 'position-marked-' + cellDataFunctionAns);
            
            checkTheWinner(cell)
            cell.textContent = cellDataFunctionAns;
            swapTheCurrentPlayerDetails(crossOrZero);

        })
    });

    const playerOneBox = document.querySelector("#player1"); 
    const playerTwoBox = document.querySelector("#player2"); 

    function swapTheCurrentPlayerDetails(crossOrZero) {
        console.log(crossOrZero);
        if(crossOrZero === 'O') {
            playerOneBox.setAttribute('class' , "currentPlayerInfo");
            playerTwoBox.removeAttribute('class' , "currentPlayerInfo")
        } else if(crossOrZero === 'X') {
            playerTwoBox.setAttribute('class' , 'currentPlayerInfo');
            playerOneBox.removeAttribute('class' , 'currentPlayerInfo')
        } else {
            alert('Some Problem Occur In crossOrZero variable')
        }
    }
