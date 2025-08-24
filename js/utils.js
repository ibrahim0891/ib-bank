


let returnElementById = (id) => {
    return document.getElementById(id)
}

let saveData = (key , data ) => {
  localStorage.setItem(key , JSON.stringify(data))
}

let getSavedData = (key) => {
   return JSON.parse(localStorage.getItem(key))
}

export {returnElementById , saveData , getSavedData}