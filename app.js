
    const addToDoButton = document.getElementById('addToDo');
    const toDoContainer = document.getElementById('toDoContainer');
    const inputText = document.getElementById('inputText');
    const inputDate = document.getElementById('inputDate');
    const clearToDo = document.getElementById('clearToDo');
  
    addToDoButton.addEventListener('click', function () {
        if (inputText.value.trim() === '' || inputDate.value.trim() === '') {
            alert('Lütfen görev ve tarih alanlarını doldurun.'); //Herhangi bir form öğesi boş kalırsa uyarı verecek, işlemi yapmayacak.
        } else { //Her iki form öğesi de doluysa ana işlemi yapacak.
            const p = document.createElement('p');
            p.classList.add('p-styling');

            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            p.appendChild(checkbox);

            toDoContainer.appendChild(p);
            p.innerHTML += '- ' + inputText.value + ' - Bitiş Tarihi: ' + inputDate.value;
            inputText.value = '';
            inputDate.value = '';

            p.addEventListener('click', function (event) {
                if (event.ctrlKey) {
                    p.style.color = '#FFDBAA'; //Ctrl+tek tık yapıldığında görev sarı oluyor. 
                } else {
                    p.style.color = '#7A9D54'; //Tek tık yapıldığında işlem tamamlandı anlamında görev yeşil oluyor.
                }
            });

            p.addEventListener('dblclick', function () {
                p.style.color = '#F31559'; //Çift tık yapıldığında işlem tamamlanmadı anlamında görev kırmızı oluyor.
            });

            // Ekleme işleminden sonra güncel liste localstorage a kaydediliyor.
            localStorage.setItem('todos', toDoContainer.innerHTML);
        }
    });

    clearToDo.addEventListener('click', function () {
        const p = toDoContainer.querySelectorAll('p');

        p.forEach((p) => {
            const checkbox = p.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                toDoContainer.removeChild(p); //Seçili checkboxun olduğu görev siliniyor.
            }
        });

        // Silme işleminden sonra güncel liste localstorage a kaydediliyor.
        localStorage.setItem('todos', toDoContainer.innerHTML);
    });

