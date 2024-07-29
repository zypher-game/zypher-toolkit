const _selectNumber = [
  {
    key: 2,
    value: 14
  },
  {
    key: 3,
    value: 25
  },
  {
    key: 4,
    value: 12
  },
  {
    key: 5,
    value: 9
  },
  {
    key: 7,
    value: 21
  },
  {
    key: 8,
    value: 36
  },
  {
    key: 9,
    value: 16
  },
  {
    key: 10,
    value: 33
  },
  {
    key: 12,
    value: 34
  },
  {
    key: 13,
    value: 22
  },
  {
    key: 14,
    value: 35
  },
  {
    key: 15,
    value: 23
  },
  {
    key: 17,
    value: 28
  },
  {
    key: 18,
    value: 29
  }
]
const selectNumber = new Map(_selectNumber.map(item => [item.key, item.value]))
export const roomInfoConfig = {
  players: [
    {
      user: '0x98F579252b517BAeA1eF2317cee6287652A5F07B'
    },
    {
      user: '0x059878E98F5aacb32205FAa61f1f396a43078B5c'
    },
    {
      user: '0x967bFA312a6802e0B3C5Bb4d1ea13F744faf4Ea5'
    },
    {
      user: '0x7366456927b95fcdC3382C56edd9997f1bcb1C32'
    },
    {
      user: '0x9B468Bf42a2865C80e7119eFBf913B561480Cf1F'
    }
  ],
  selectNumber: selectNumber,
  selectedNumbers: [9, 12, 14, 16, 21, 22, 23, 25, 28, 29, 33, 34, 35, 36]
}
export const roundInfoConfig = {
  player: '0x0000000000000000000000000000000000000000',
  round: 18,
  remain: 0,
  status: 'end'
}
