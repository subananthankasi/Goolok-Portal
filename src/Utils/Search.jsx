export const SearchData = (data, searchText, searchColumns) => { 
  if (!searchText || !searchColumns || searchColumns.length === 0) {
    return data;
  }

  const lowerCaseSearchText = searchText.toLowerCase();
  return data.filter(row =>
    searchColumns.some(key =>
      row && row[key] && typeof row[key] === 'string' && row[key].toLowerCase().includes(lowerCaseSearchText)
    )
  );
};
