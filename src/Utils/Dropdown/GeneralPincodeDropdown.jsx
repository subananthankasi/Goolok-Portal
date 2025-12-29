import React, { useEffect, useMemo } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { pincodeGetThunk } from "../../Redux/Actions/MasterPage/GeneralAddressAction";

const GeneralPincodeDropdown = ({
    value,
    onChange,
    onBlur,
    villageId,
    width = "100%",
    disabled = false,
}) => {
    const dispatch = useDispatch();

    const { data, loading } = useSelector(
        (state) => state.generalAddress.pincode
    );

    useEffect(() => {
        if (!data || data.length === 0) {
            dispatch(pincodeGetThunk());
        }
    }, [dispatch]);


    const options = useMemo(() => {
        if (!villageId) return [];
        return data
            ?.filter((item) => item.pin_village === villageId)
            .map((item) => ({
                value: item.id,
                label: item.pincode,
            }));
    }, [data, villageId]);

    return (
        <Select
            showSearch
            allowClear
            loading={loading}
            placeholder="Select Pincode"
            style={{ width }}
            optionFilterProp="label"
            options={options}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled || !villageId}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
        />
    );
};

export default GeneralPincodeDropdown;
