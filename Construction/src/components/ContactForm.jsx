{/* const ContactForm = (produto) => {
  console.log(produto);
  return (
    <form
      action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00D4T000000Fw59"
      method="POST"
    >
      <input type="hidden" name="oid" value="00D4T000000Fw59" />
      <input type="hidden" name="retURL" value="http://grupotimber.com.br" />
      <input
        type="hidden"
        name="recordType"
        for="recordType"
        id="recordType"
        value="012Np000000BUIv"
      />
      <input
        type="hidden"
        name="lead_source"
        for="lead_source"
        id="lead_source"
        value="Timber Construction"
      />
      
      <input
        type="hidden"
        name="00NNp000006pQ6n"
        for="00NNp000006pQ6n"
        id="00NNp000006pQ6n"
        value={produto.productName}
      />

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="last-name"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Nome Completo
          </label>
          <div className="mt-2.5">
            <input
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="name"
              className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="cpf"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            CPF
          </label>
          <div className="mt-2.5">
            <input
              id="00N4T00000700nK"
              name="00N4T00000700nK"
              type="text"
              maxLength="11"
              autoComplete="off"
              className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Empresa
          </label>
          <div className="mt-2.5">
            <input
              id="company"
              name="company"
              type="text"
              maxLength="40"
              autoComplete="organization"
              className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="cnpj"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            CNPJ
          </label>
          <div className="mt-2.5">
            <input
              id="00N4T00000700nG"
              name="00N4T00000700nG"
              type="text"
              maxLength="14"
              autoComplete="off"
              className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2.5">
            <input
              id="email"
              name="email"
              type="email"
              maxLength="80"
              autoComplete="email"
              className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Telefone
          </label>
          <div className="mt-2.5">
            <input
              id="00N4T00000701IT"
              name="00N4T00000701IT"
              type="text"
              maxLength="15"
              autoComplete="tel"
              className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="zip"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            CEP
          </label>
          <div className="mt-2.5">
            <input
              id="zip"
              name="zip"
              type="text"
              maxLength="20"
              autoComplete="postal-code"
              className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Filial
          </label>
          <div className="mt-2.5">
            <select
              id="00NHY000000OY6P"
              name="00NHY000000OY6P"
              title="Filial"
              className="block w-full rounded-md border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required>
                
              <option value="">Selecione a filial</option>
              <option value="Curitiba - PR">Curitiba - PR</option>
              <option value="Guaíba - RS">Guaíba - RS</option>
              <option value="Palhoça - SC">Palhoça - SC</option>
            </select>           
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Mensagem
          </label>
          <div className="mt-2.5">
            <textarea
              id="00NHY000000QHkf"
              name="00NHY000000QHkf"
              rows="4"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            ></textarea>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 text-white font-medium py-[10px] px-[182px] rounded-lg text-lg mb-10"
          >
            Enviar
          </button>
        </div>
    </form>
  );
};

export default ContactForm; */}