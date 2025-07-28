const listTextareaMCE = document.querySelectorAll("[textarea-mce]");

console.log(listTextareaMCE);


if (listTextareaMCE.length > 0) {
  listTextareaMCE.forEach((textarea) => {
    const id = textarea.id;
    tinymce.init({
    selector: `#${id}`,
    api_key: t4xbolzfnw5lk3co8817xj968m1sd6p8jveaa2omy5kw7awv,
    plugins: "image code",
    image_title: true,
    image_upload_url: "/admin/upload",
    automatic_uploads: true,
    file_picker_types: 'image',
}); 
  })
}
