module.exports = function makeQuery(entry) {
  const query = {};
  query.$and = [];
  if (entry.title) {
    query.title = { $regex: new RegExp('^' + entry.title, 'i') };
  }

  if (entry.authors) {
    for (let author of entry.authors) {
      if (author.lastName.length > 0) {
        const subQuery = { 'authors.lastName': author.lastName };
        query.$and.push(subQuery);
      }
    }
  }
  if (entry.editors) {
    for (let editor of entry.editors) {
      if (editor.lastName.length > 0) {
        const subQuery = { 'editors.lastName': editor.lastName };
        query.$and.push(subQuery);
      }
    }
  }
  if (query.$and.length === 0) {
    delete query.$and;
  }
  return query;
};
