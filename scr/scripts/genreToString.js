// Строка для жанров
export default function genreToString(values) {
    let genre = '';
    if (values.cartoon == true) genre += 'Cartoon ';
    if (values.comedy == true) genre += 'Comedy ';
    if (values.detective == true) genre += 'Detective ';
    if (values.drama == true) genre += 'Drama ';
    if (values.history == true) genre += 'History ';
    if (values.horror == true) genre += 'Horror ';
    if (values.thriller == true) genre += 'Thriller ';
    genre.trim();
    return genre;
}