# Modelling data

## Data required

- Every piece and it's location on board
- Play state - Who's turn

id | name | Start point
--- | --- | ---
0001 | B_Pawn_1 | A2
0002 | B_Pawn_2 | B2
0003 | B_Pawn_3 | C2
0004 | B_Pawn_4 | D2
0005 | B_Pawn_5 | E2
0006 | B_Pawn_6 | F2
0007 | B_Pawn_7 | G2
0008 | B_Pawn_8 | H2
0009 | B_Bishop_1 | C1
0010 | B_Bishop_2 | F1
... | ...

> This table contains all of the possble pieces that can be moved on the board. 

id | Piece_id | Transaction
---| --- | ---
0001 | 0001 | A3
0002 | 0002 | B4
0003 | 0003 | C3
... | ... | ...

> This table contains every transaction of every move made since the start of the game. New moves insert into the table sequentially.
