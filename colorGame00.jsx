//child component of the Board is Square. If the state of the Board changes, then the child Square is re-rendered. You can force this with a reRender button.
//The Square keeps track of the X or O and color on it.
const Square = ({id, newState}) => {
  const palet = ["red", "blue", "green"];
  const [color, setColor] = React.useState('black')
  const [status, setStatus] = React.useState(null)
  const xo = ["O","X"]
  const getRandomColor = () => {
    return (
      palet[Math.floor(Math.random() * 3)]
    )
  };
  React.useEffect(()=> {
    console.log(`render square ${id}`);
    return ()=> console.log(`unmounting square ${id}`);
  })

  return (
    //make each blue square a button and place it in the gamboard as div with className = grid-row
    <button
      onClick={ e => {
        let newColor = getRandomColor()
        setColor(newColor)
        //setColor does not activate right away because it is an asych function. Use newColor to set the background.
        e.target.style.background = newColor
        //newSquareProperties object is passed to the trackState function in the Board.
        let nextPlayer = newState(id);
        setStatus(nextPlayer)
      }}
      >
        <h1>{xo[status]}</h1>
      </button>
  );
};

const Board = () => {
  
  //keep track of the players with [state,setState] through the trackState function. Who clicked each square(X or O).
  //keep track of who's turn it is with [player, setPlayer]. Who is the presentPlayer and nextPlayer.  
  //make the Board know which player is playing with "status"
  
  const [player, setPlayer] = React.useState(1);
  //const [playerName, setPlayerName] = React.useState('Ugo');
  const [mounted, setMounted] = React.useState(true);
  const [random, setRandom] = React.useState(0);
  const [state, setState] = React.useState(Array(9).fill(null));

  

  function checkWinner(state) {
    //state is an array of 0,1
    const win = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for (let i = 0; i < win.length; i++) {
      const [a,b,c] = win[i]
      if(state[a] == state[b] && state[a] == state[c] && state[a] != null)
      return state[a]
    }
    return null
  }

  let status = `Your turn ${player}`;
  let winner = checkWinner(state)
  if (winner != null) status = `winner is ${winner}`

  //call this function from the Square to track state in the Board. When the square is clicked, the board setState.
  function newState(idOfSquare) {
    let thePlayer = player
    state[idOfSquare] = player //player that clicked on the square
    setState(state); //array of 0,1 or null
    let nextPlayer = (player + 1) % 2
    
    console.log(state)
    console.log(`adding ${player}`)

    setPlayer(nextPlayer)
    return thePlayer
  }

  

  const reRender = ()=> setRandom(Math.random());

  function toggle() {
    return setMounted(!mounted)
  }


  
  //function to build squares
  function renderSquare(i) {
    return <Square id={i} player={player} newState={newState}></Square>
  }

  //make the Board know which player is playing with "status"
  //Status Bar = <h1>{status}</h1>
  //change the player whith an onClick event (e)
  //place squares inside the grid-row
  return (
    <div
      className="game-board">
      <div className="grid-row">
        {mounted && renderSquare(0)}
        {mounted && renderSquare(1)}
        {mounted && renderSquare(2)}
      </div>
      <div className="grid-row">
        {mounted && renderSquare(3)}
        {mounted && renderSquare(4)}
        {mounted && renderSquare(5)}
      </div>
      <div className="grid-row">
        {mounted && renderSquare(6)}
        {mounted && renderSquare(7)}
        {mounted && renderSquare(8)}
      </div>
      
      <div id="info">
        <button onClick={toggle}>Show/Hide Row</button>
        <button onClick={reRender}>re-render</button>
        <h1>{status}</h1>
      </div> Ugo and Igo play tic-tac-toe
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
