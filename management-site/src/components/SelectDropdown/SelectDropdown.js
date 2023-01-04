import Select from "react-select"

const SelectDropdown = ({ options, placeholder, onChange }) => {
    return (
        <div>
            <Select options={options} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}

export default SelectDropdown
