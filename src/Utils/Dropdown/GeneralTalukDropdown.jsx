import React, { useEffect, useMemo } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { talukGetThunk } from "../../Redux/Actions/MasterPage/GeneralAddressAction";

const GeneralTalukDropdown = ({
    value,
    onChange,
    onBlur,
    districtId,
    width = "100%",
    disabled = false,
}) => {
    const dispatch = useDispatch();

    const { data, loading } = useSelector(
        (state) => state.generalAddress.taluk
    );

    useEffect(() => {
        if (!data || data.length === 0) {
            dispatch(talukGetThunk());
        }
    }, [dispatch]);

    // district
    const options = useMemo(() => {
        if (!districtId) return [];
        return data
            ?.filter((item) => item.taluk_district === districtId)
            .map((item) => ({
                value: item.id,
                label: item.taluk_name,
            }));
    }, [data, districtId]);

    return (
        <Select
            showSearch
            allowClear
            loading={loading}
            placeholder="Select Taluk"
            style={{ width }}
            optionFilterProp="label"
            options={options}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled || !districtId}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
        />
    );
};

export default GeneralTalukDropdown;
