"use strict";

// Сделать Валидейт функции проверки на строку и проверку на пробелы в стоке
// Функция trim для строки. Тоесть motherName.trim ()

function createFamily(motherName, fatherName) {
  validateName(motherName);
  validateName(fatherName);
  let family = {
    mother,
    father,
    children: [],
    makeChild(name) {
      validateName(name);
      let child = {
        name: `${name}`,
        parents: `${mother} and ${father}`
      };
      this.children.push(child);
    }
  };

  return family;
}
