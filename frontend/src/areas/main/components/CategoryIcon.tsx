import React from "react";
import {TransactionCategory} from "@main/types";
import FoodIcon from '@mui/icons-material/LocalPizza';
import LifeStyleIcon from '@mui/icons-material/EmojiEmotions';
import FinanceIcon from '@mui/icons-material/AccountBalance';
import HealthcareIcon from '@mui/icons-material/LocalHospital';
import HousingIcon from '@mui/icons-material/House';
import TravelIcon from '@mui/icons-material/TravelExplore';
import MiscIcon from '@mui/icons-material/ShoppingBag';
import InsuranceIcon from '@mui/icons-material/Savings';
import UtilitiesIcon from '@mui/icons-material/ReceiptLong';
import EntertainmentIcon from '@mui/icons-material/Nightlife';
import {SvgIconOwnProps} from "@mui/material/SvgIcon/SvgIcon";

const ICONS = {
    [TransactionCategory.housing]: HousingIcon,
    [TransactionCategory.travel]: TravelIcon,
    [TransactionCategory.food]: FoodIcon,
    [TransactionCategory.utilities]: UtilitiesIcon,
    [TransactionCategory.insurance]: InsuranceIcon,
    [TransactionCategory.lifestyle]: LifeStyleIcon,
    [TransactionCategory.financial]: FinanceIcon,
    [TransactionCategory.healthcare]: HealthcareIcon,
    [TransactionCategory.entertainment]: EntertainmentIcon,
    [TransactionCategory.miscellaneous]: MiscIcon,
}

const DEFAULT_ICON = MiscIcon;

export const CategoryIcon: React.FC<{ category: TransactionCategory } & SvgIconOwnProps> = ({ category, ...props }) => {
    const Icon = ICONS[category] || DEFAULT_ICON;
    return <Icon {...props} />
}