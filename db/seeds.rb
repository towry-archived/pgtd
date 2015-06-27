
boards_lists = [
  ["board1", "towry"],
  ["board2", "jack"],
  ["board3", "foo"],
  ["board4", "michael"],
  ["board5", "fab"]
]

boards_lists.each do |name, creator|
  Board.create(name: name, creator: creator)
end
