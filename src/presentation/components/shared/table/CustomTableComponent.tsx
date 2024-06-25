/* eslint-disable no-mixed-spaces-and-tabs */

const columns: string[] = [
  'Codigo',
  'Nombre de Producto',
  'Cantidad',
  'Categoria de Producto',
  'Creado Por:',
  'Fecha de Creacion',
];
export const CustomTableComponent = () => {
  return (
    <>
      <table className="border-collapse w-full mt-10">
        <thead>
          <tr>
            {columns.map((e, i) => {
              return (
                <th
                  key={i}
                  className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  {e}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr className=" cursor-pointer bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className=" lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Company name
              </span>
              KnobHome
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Country
              </span>
              German
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Status
              </span>
              <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">
                deleted
              </span>
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Actions
              </span>
              <a
                href="#"
                className="text-blue-400 hover:text-blue-600 underline">
                Edit
              </a>
              <a
                href="#"
                className="text-blue-400 hover:text-blue-600 underline pl-6">
                Remove
              </a>
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Country
              </span>
              German
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
              <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                Country
              </span>
              German
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
