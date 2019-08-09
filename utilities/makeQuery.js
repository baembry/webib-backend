module.exports = function makeQuery(entry) {
  const query = {};
  query.$and = [];
  if (entry.title) {
    query.title = { $regex: new RegExp('^' + entry.title, 'i') };
  }

  if (entry.authors) {
    for (let author of entry.authors) {
      if (author.lastName.length > 0) {
        const lastName =
          author.lastName.slice(0, 1).toUpperCase() +
          author.lastName.slice(1).toLowerCase();
        const subQuery = {
          $or: [
            { 'authors.lastName': lastName },
            { 'authors.lastName': lastName.toLowerCase() },
          ],
        };
        query.$and.push(subQuery);
      }
    }
  }
  if (entry.editors) {
    for (let editor of entry.editors) {
      if (editor.lastName.length > 0) {
        const lastName =
          editor.lastName.slice(0, 1).toUpperCase() +
          editor.lastName.slice(1).toLowerCase();
        const subQuery = {
          $or: [
            { 'editors.lastName': lastName },
            { 'editors.lastName': lastName.toLowerCase() },
          ],
        };
        query.$and.push(subQuery);
      }
    }
  }
  if (query.$and.length === 0) {
    delete query.$and;
  }
  return query;
};
