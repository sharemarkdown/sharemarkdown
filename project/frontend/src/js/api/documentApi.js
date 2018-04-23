/* global Promise */


export const documentApi ={
  get_documents,
  save_content,
  create_document,
  // save_document,
};



const test = [
  {'id': 0, 'title': "File1", 'content': "File 1 is dklasfjkldsaheuheu lksdajf lkasdjfkl "},
  {'id': 1, 'title': "README", 'content': "README Cansalkdfj daslkfj sdlkfj sdlkf jklds "},
]


function get_documents(){

  return new Promise((resolve, ) =>{
    resolve(test);
  })

}

function save_content(id, content){
  test[id].content = content;

  return new Promise((resolve, ) => {
    resolve(test[id]);
  })

}

function create_document(title){
  const id = test.length;
  test.push({'id': id, 'title': title, 'content': ''})
  return new Promise((resolve, ) => {
    resolve(test)
  })
}
