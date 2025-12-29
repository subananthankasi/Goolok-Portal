import React, { useEffect, useMemo } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { villageGetThunk } from "../../Redux/Actions/MasterPage/GeneralAddressAction";

const GeneralVillageDropdown = ({
    value,
    onChange,
    onBlur,
    talukId,
    width = "100%",
    disabled = false,
}) => {
    const dispatch = useDispatch();

    const { data, loading } = useSelector(
        (state) => state.generalAddress.village
    );


    useEffect(() => {
        if (!data || data.length === 0) {
            dispatch(villageGetThunk());
        }
    }, [dispatch]);

    //  taluk
    const options = useMemo(() => {
        if (!talukId) return [];
        return data
            ?.filter((item) => item.village_taluk === talukId)
            .map((item) => ({
                value: item.id,
                label: item.village_name,
            }));
    }, [data, talukId]);

    return (
        <Select
            showSearch
            allowClear
            loading={loading}
            placeholder="Select Village"
            style={{ width }}
            optionFilterProp="label"
            options={options}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled || !talukId}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
        />
    );
};

export default GeneralVillageDropdown;
