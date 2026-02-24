import { Table, Button, IconButton, Input, SelectPicker } from 'rsuite';
import { useEffect, useState } from 'react';
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';
import CheckIcon from '@rsuite/icons/Check';
import { useDispatch, useSelector } from 'react-redux';
import { pricingGetThunk } from '../../../../Redux/Actions/MasterPage/PricingThunk';

const { Column, HeaderCell, Cell } = Table;

const styles = `
.table-cell-editing .rs-table-cell-content { padding: 4px; }
.table-cell-editing .rs-input, .table-cell-editing .rs-picker-toggle { width: 100%; }
`;

const NewPricingDepartment = () => {

    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(pricingGetThunk());
    }, []);

    const options = useSelector(state => state.pricing.get?.data) || [];

    const pricingOptions = options.map(item => ({
        label: item.charges_name,
        value: item.id,
        unit: item.unit
    }));

    const handleChange = (id, key, value) => {
        const updated = [...data];
        const row = updated.find(item => item.id === id);

        row[key] = value;

        if (key === "pricing_type") {
            const selected = pricingOptions.find(o => o.value === value);
            row.unit = selected?.unit || "No";

            if (row.unit === "No") row.unitValue = "";
        }

        setData(updated);
    };

    const handleEdit = (id) => {
        const updated = [...data];
        const row = updated.find(item => item.id === id);
        row.status = row.status ? null : "EDIT";
        setData(updated);
    };

    const handleRemove = (id) => {
        setData(data.filter(item => item.id !== id));
    };

    const totalPrice = data.reduce((sum, item) => sum + Number(item.price || 0), 0);

    return (
        <div className="card shadow border-0 mt-3 p-4">

            <style>{styles}</style>

            <div className="d-flex justify-content-end mb-2">
                <Button appearance="primary" color="yellow" style={{ color: "black", borderRadius: "0px" }}
                    onClick={() => {
                        setData([
                            { id: Date.now(), pricing_type: null, unit: "", unitValue: "", price: "", status: "EDIT" },
                            ...data
                        ]);
                    }}
                >
                    Add Pricing
                </Button>
            </div>

            <Table height={200} data={data}  bordered virtualized={false} autoHeight={false}>

                <Column flexGrow={1} width={250}>
                    <HeaderCell>Pricing Type</HeaderCell>
                    <EditableDropdownCell
                        dataKey="pricing_type"
                        options={pricingOptions}
                        onChange={handleChange}
                        onEdit={handleEdit}
                        width= "250px"
                    />
                </Column>

                <Column width={250}>
                    <HeaderCell>Unit</HeaderCell>
                    <UnitCell onChange={handleChange} onEdit={handleEdit} />
                </Column>

                <Column width={300}>
                    <HeaderCell>Price</HeaderCell>
                    <EditablePriceCell dataKey="price" onChange={handleChange} onEdit={handleEdit} />
                </Column>

                <Column width={150}>
                    <HeaderCell>Action</HeaderCell>
                    <ActionCell onEdit={handleEdit} onRemove={handleRemove} />
                </Column>

            </Table>

            {totalPrice > 0 && (
                <div className="mt-3 text-end fw-bold fs-5">
                    Total: ₹ {totalPrice}
                </div>
            )}

        </div>
    );
};

export default NewPricingDepartment;



const EditableDropdownCell = ({ rowData, dataKey, onChange, onEdit, options, ...props }) => {
    const editing = rowData.status === "EDIT";

    return (
        <Cell
            {...props}
            className={editing ? "table-cell-editing" : ""}
            onDoubleClick={() => onEdit(rowData.id)}
        >
            {editing ? (
                <SelectPicker
                    data={options}
                    block
                    defaultValue={rowData[dataKey]}
                    onChange={(value) => onChange(rowData.id, dataKey, value)}
                />
            ) : (
                options.find(o => o.value === rowData[dataKey])?.label || ""
            )}
        </Cell>
    );
};


const UnitCell = ({ rowData, onChange, onEdit, ...props }) => {
    const editing = rowData.status === "EDIT";

    return (
        <Cell
            {...props}
            className={editing ? "table-cell-editing" : ""}
            onDoubleClick={() => onEdit(rowData.id)}
        >
            {editing && rowData.unit === "Yes" ? (
                <Input
                    type="text"
                    placeholder="Enter Unit"
                    defaultValue={rowData.unitValue}
                    onChange={(value) => onChange(rowData.id, "unitValue", value)}
                />
            ) : (
                rowData.unit === "Yes" ? rowData.unitValue || "Enter" : "No"
            )}
        </Cell>
    );
};


const EditablePriceCell = ({ rowData, dataKey, onChange, onEdit, ...props }) => {
    const editing = rowData.status === "EDIT";

    return (
        <Cell
            {...props}
            className={editing ? "table-cell-editing" : ""}
            onDoubleClick={() => onEdit(rowData.id)}
        >
            {editing ? (
                <Input
                    type="number"
                    placeholder="Price"
                    defaultValue={rowData[dataKey]}
                    onChange={(value) => onChange(rowData.id, dataKey, value)}
                />
            ) : (
                rowData[dataKey] || ""
            )}
        </Cell>
    );
};


const ActionCell = ({ rowData, onEdit, onRemove, ...props }) => {
    const editing = rowData.status === "EDIT";

    return (
        <Cell {...props} style={{ display: "flex", gap: "6px" }}>
            <IconButton icon={editing ? <CheckIcon /> : <EditIcon />} onClick={() => onEdit(rowData.id)} />
            <IconButton icon={<TrashIcon />} color="red" onClick={() => onRemove(rowData.id)} />
        </Cell>
    );
};
