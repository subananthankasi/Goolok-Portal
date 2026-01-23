import React, { useEffect } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { stateGetThunk } from "../../Redux/Actions/MasterPage/GeneralAddressAction";

const GeneralState = ({
    value,
    onChange,
    onBlur,
    width = "100%",
    disabled = false,
}) => {
    const dispatch = useDispatch();

    const { data, loading } = useSelector(
        (state) => state.generalAddress.state
    );

    useEffect(() => {
        if (!data || data.length === 0) {
            dispatch(stateGetThunk());
        }
    }, [dispatch,data]);

    const options = data?.map((item) => ({
        value: item.id,
        label: item.state_name,
    }));
    return (
        <Select
            showSearch
            allowClear
            loading={loading}
            placeholder="Select State"
            style={{ width }}
            optionFilterProp="label"
            options={options}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
        />
    );
};

export default GeneralState;
