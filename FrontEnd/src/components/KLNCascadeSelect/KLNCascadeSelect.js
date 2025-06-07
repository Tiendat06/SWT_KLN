import { Dropdown } from "primereact/dropdown";
import {useAdminContext} from "~/context/AdminContext";

const KLNCascadeSelect = ({...props}) => {

    const paginateData = [
        { name: "5", code: 5 },
        { name: "10", code: 10 },
        { name: "25", code: 25 },
        { name: "50", code: 50 },
        { name: "100", code: 100 },
    ];
    const {
        selectedPageOption, setSelectedPageOption
    } = useAdminContext();

    return (
        <Dropdown
            {...props}
            value={selectedPageOption}
            options={paginateData}
            onChange={(e) => setSelectedPageOption(e.value)}
            optionLabel="name"
            placeholder="--N/A--"
            pt={{
                root: { style: { height: '30px' } },
                input: { style: { padding: '8px 8px', lineHeight: '1', fontSize: 12 } },
            }}

        />
    );
}

export default KLNCascadeSelect;