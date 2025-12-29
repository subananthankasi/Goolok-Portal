import React, { useEffect, useMemo } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { districtGetThunk } from "../../Redux/Actions/MasterPage/GeneralAddressAction";

const GeneralDistrict = ({
    value,
    onChange,
    onBlur,
    stateId,
    width = "100%",
    disabled = false,
}) => {
    const dispatch = useDispatch();

    const { data, loading } = useSelector(
        (state) => state.generalAddress.district
    );

    useEffect(() => {
        if (!data || data.length === 0) {
            dispatch(districtGetThunk());
        }
    }, [dispatch]);

    // 🔹 Filter district by selected state
    const options = useMemo(() => {
        if (!stateId) return [];
        return data
            ?.filter((item) => item.state_type === stateId)
            .map((item) => ({
                value: item.id,
                label: item.district,
            }));
    }, [data, stateId]);

    return (
        <Select
            showSearch
            allowClear
            loading={loading}
            placeholder="Select District"
            style={{ width }}
            optionFilterProp="label"
            options={options}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled || !stateId}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
        />
    );
};

export default GeneralDistrict;
