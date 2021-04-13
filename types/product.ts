type Spot = {
  spot_id: string;
  price: string;
  profit: string;
  profit_netto: string;
  visible: string;
};

export type Modification = {
  modificator_id: string;
  modificator_name: string;
  modificator_selfprice: string;
  modificator_selfprice_netto: string;
  order: string;
  modificator_barcode: string;
  modificator_product_code: string;
  spots: Spot[];
  ingredient_id: string;
  fiscal_code: string;
};

export type IngredientType = {
  structure_id: string;
  ingredient_id: string;
  pr_in_clear: string;
  pr_in_cook: string;
  pr_in_fry: string;
  pr_in_stew: string;
  pr_in_bake: string;
  structure_unit: string;
  structure_type: string;
  structure_brutto: number;
  structure_netto: number;
  structure_lock: string;
  structure_selfprice: string;
  structure_selfprice_netto: string;
  ingredient_name: string;
  ingredient_unit: string;
  ingredient_weight: number;
  ingredients_losses_clear: string;
  ingredients_losses_cook: string;
  ingredients_losses_fry: string;
  ingredients_losses_stew: string;
  ingredients_losses_bake: string;
};

export type ProductType = {
  barcode: string;
  category_name: string;
  unit: string;
  cost: string;
  cost_netto: string;
  fiscal: string;
  hidden: string | boolean;
  menu_category_id: string;
  workshop: string;
  nodiscount: string;
  photo?: string | null;
  photo_origin?: string | null;
  product_code: string;
  product_id: string;
  product_name: string;
  sort_order: string;
  tax_id: string;
  product_tax_id: string;
  type: string;
  weight_flag: string;
  color: string;
  ingredient_id: string;
  different_spots_prices: string;
  modifications?: Modification[];
  out: number;
  price: {1: string};
  profit: {1: string};
  spots: Spot[];
  ingredients?: IngredientType[];
};
