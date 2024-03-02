import API_URL from "./api_config";

const ItemForm = ({formDivId, title, btnName, submitFn}) =>{

    const submitWrapper = () => {

        let div = document.getElementById(formDivId);

        let nameInput = div.querySelector("#nameInput");
        let qtyInput = div.querySelector("#qtyInput");
        let checkboxInput = div.querySelector("#checkboxInput");

        let quantityString = qtyInput.value;

        let name = nameInput.value;


        let quantity = Number(quantityString);

        if(quantity === 0){
            alert("Invalid Quantity");
            return;
        }

        let active = checkboxInput.checked;

        // Reset the form
        nameInput.value = "";
        qtyInput.value = 1;
        checkboxInput.checked = true;
        
        submitFn([API_URL, {name, quantity, active}]);
    }

    return(
        <dialog className="item-form dialog bg-gradient-to-br from-slate-800 to-gray-900 rounded-3xl">
            <form method="dialog">
                <h1 className="py-5 px-4">{title}</h1>
                <div className="space-x-5 pb-5 px-5 items-center">
                    <table>
                    <tbody>
                        <tr>
                            <td className="py-3">
                            <label htmlFor="nameInput">Name:</label>
                            </td>
                            <td className="py-3">
                            <input autoComplete="off" className="bg-opacity-20 outline outline-gray-500" id="nameInput" type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3">
                            <label htmlFor="qtyInput">Quantity:</label>
                            </td>
                            <td className="py-3 ">
                            <input autoComplete="off" defaultValue={1} className="bg-opacity-20 outline outline-gray-500" id="qtyInput" type="number" />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3">
                            <label htmlFor="checkboxInput">Active:</label>
                            </td>
                            <td className="py-3">
                            <input defaultChecked={true} id="checkboxInput" type="checkbox" />
                            </td>
                        </tr>
                    </tbody>

                    </table>

                    <button
                    onClick={
                        () => submitWrapper()
                    }
                    className="btn btn-primary btn-outline"
                    >
                    {btnName}
                    </button>
                    <button onClick={
                        () => {
                            document.getElementById(formDivId).querySelector(".item-form").close();
                        }
                    
                    } className="btn btn-secondary btn-outline">Cancel</button>
                </div>
            </form>
        </dialog>
    )
}

export default ItemForm;