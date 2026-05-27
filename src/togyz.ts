type Side = 0 | 1;
type Pit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type Pits = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];
type Board = [Pits, Pits];

class Togyz {
  board: Board;

  constructor() {
    this.board = [
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9, 9],
    ];
  }

  move(side: Side, pit: Pit) {
    const stones = this.board[side][pit];

    let tempPit = pit;
    let tempSide = side;
    this.board[side][pit] = 0;

    if (stones === 0) return;

    if (stones === 1) {
      if (tempPit === 8) {
        tempSide = Number(!tempSide) as Side;
        this.board[tempSide][0]++;
        return;
      } else {
        tempPit++;
        this.board[tempSide][tempPit]!++;
        return;
      }
    }

    for (let i = 0; i < stones; i++) {
      if (tempPit <= 8) {
        this.board[tempSide][tempPit]++;
        tempPit++;
      } else {
        if (tempSide === 0) {
          tempPit = 0;
          tempSide = 1;
          this.board[tempSide][tempPit]++;
          tempPit++;
        } else {
          tempPit = 0;
          tempSide = 0;
          this.board[tempSide][tempPit]++;
          tempPit++;
        }
      }
    }
  }

  ascii() {
    const a = [...this.board[0]].reverse() as unknown as Pits;
    const b = [...this.board[1]] as unknown as Pits;

    const colWidths: any[] = [];

    [a, b].forEach((row) => {
      row.forEach((pit, i) => {
        colWidths[i] = Math.max(colWidths[i] || 0, String(pit).length);
      });
    });

    const formatRow = (row: Pits) =>
      row.map((pit, i) => String(pit).padStart(colWidths[i], " ")).join(" | ");

    console.log(formatRow(a));
    console.log(formatRow(b));
  }
}

const togyz = new Togyz();
togyz.move(0, 5);
console.log(togyz.ascii());
togyz.move(0, 0);
console.log(togyz.ascii());
togyz.move(1, 8);
console.log(togyz.ascii());
togyz.move(0, 0);
console.log(togyz.ascii());
togyz.move(0, 0);
console.log(togyz.ascii());
togyz.move(1, 8);
console.log(togyz.ascii());
togyz.move(0, 1);
console.log(togyz.ascii());
