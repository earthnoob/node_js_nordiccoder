var ScoreCriteria = require('../schemas/score-criteria.schema');

ScoreCriteria.create(
  {
    category: 'ORAL',
    description: 'Điểm miệng',
    weight: 1,
  },
  {
    category: 'FIFTEEN',
    description: 'Điểm 15 phút',
    weight: 1,
  },
  {
    category: 'FORTYFIVE',
    description: 'Điểm 1 tiết',
    weight: 2,
  },
  {
    category: 'MIDTERM',
    description: 'Điểm giữa kỳ',
    weight: 2,
  },
  {
    category: 'FINAL',
    description: 'Điểm cuối kỳ',
    weight: 3,
  }
).then(() => { console.log('done lol') });