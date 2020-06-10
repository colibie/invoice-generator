$('#form').submit(function () {
  addContent();
  printToPDF();
});

function addContent() {
  const result = $('#form').serializeArray();
  result.forEach(element => {
    const text = element.value == '' ? '--' : element.value;
    $(`#${element.name}`).text(text);
  });

  $.each($("input[class='payment-detail']:checked"), function () {
    $(`input[name='${$(this).val()}']`).prop('checked', true);
  });

  $.each($("input[class='shipment-detail']:checked"), function () {
    $(`input[name='${$(this).val()}']`).prop('checked', true);
  });
}

function clearContent() {
  $.each($("input[class='payment-detail']:checked"), function () {
    $(`input[name='${$(this).val()}']`).prop('checked', false);
  });

  $.each($("input[class='shipment-detail']:checked"), function () {
    $(`input[name='${$(this).val()}']`).prop('checked', false);
  });

  const result = $('#form').serializeArray();
  result.forEach(element => {
    $(`#${element.name}`).text('--');
  });

  $('#form')[0].reset();
}

function printToPDF() {
  var element = document.getElementById('print');
  var opt = {
    margin: 0,
    filename: 'invoice.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'pt', orientation: 'landscape' }
  };

  html2pdf().from(element).set(opt).save().then(() => clearContent()); // convert to pdf
}