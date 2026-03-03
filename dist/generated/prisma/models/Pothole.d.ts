import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Pothole
 *
 */
export type PotholeModel = runtime.Types.Result.DefaultSelection<Prisma.$PotholePayload>;
export type AggregatePothole = {
    _count: PotholeCountAggregateOutputType | null;
    _avg: PotholeAvgAggregateOutputType | null;
    _sum: PotholeSumAggregateOutputType | null;
    _min: PotholeMinAggregateOutputType | null;
    _max: PotholeMaxAggregateOutputType | null;
};
export type PotholeAvgAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
    severity: number | null;
};
export type PotholeSumAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
    severity: number | null;
};
export type PotholeMinAggregateOutputType = {
    id: string | null;
    latitude: number | null;
    longitude: number | null;
    severity: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PotholeMaxAggregateOutputType = {
    id: string | null;
    latitude: number | null;
    longitude: number | null;
    severity: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PotholeCountAggregateOutputType = {
    id: number;
    latitude: number;
    longitude: number;
    severity: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PotholeAvgAggregateInputType = {
    latitude?: true;
    longitude?: true;
    severity?: true;
};
export type PotholeSumAggregateInputType = {
    latitude?: true;
    longitude?: true;
    severity?: true;
};
export type PotholeMinAggregateInputType = {
    id?: true;
    latitude?: true;
    longitude?: true;
    severity?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PotholeMaxAggregateInputType = {
    id?: true;
    latitude?: true;
    longitude?: true;
    severity?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PotholeCountAggregateInputType = {
    id?: true;
    latitude?: true;
    longitude?: true;
    severity?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PotholeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Pothole to aggregate.
     */
    where?: Prisma.PotholeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Potholes to fetch.
     */
    orderBy?: Prisma.PotholeOrderByWithRelationInput | Prisma.PotholeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PotholeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Potholes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Potholes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Potholes
    **/
    _count?: true | PotholeCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PotholeAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PotholeSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PotholeMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PotholeMaxAggregateInputType;
};
export type GetPotholeAggregateType<T extends PotholeAggregateArgs> = {
    [P in keyof T & keyof AggregatePothole]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePothole[P]> : Prisma.GetScalarType<T[P], AggregatePothole[P]>;
};
export type PotholeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PotholeWhereInput;
    orderBy?: Prisma.PotholeOrderByWithAggregationInput | Prisma.PotholeOrderByWithAggregationInput[];
    by: Prisma.PotholeScalarFieldEnum[] | Prisma.PotholeScalarFieldEnum;
    having?: Prisma.PotholeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PotholeCountAggregateInputType | true;
    _avg?: PotholeAvgAggregateInputType;
    _sum?: PotholeSumAggregateInputType;
    _min?: PotholeMinAggregateInputType;
    _max?: PotholeMaxAggregateInputType;
};
export type PotholeGroupByOutputType = {
    id: string;
    latitude: number;
    longitude: number;
    severity: number | null;
    createdAt: Date;
    updatedAt: Date;
    _count: PotholeCountAggregateOutputType | null;
    _avg: PotholeAvgAggregateOutputType | null;
    _sum: PotholeSumAggregateOutputType | null;
    _min: PotholeMinAggregateOutputType | null;
    _max: PotholeMaxAggregateOutputType | null;
};
type GetPotholeGroupByPayload<T extends PotholeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PotholeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PotholeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PotholeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PotholeGroupByOutputType[P]>;
}>>;
export type PotholeWhereInput = {
    AND?: Prisma.PotholeWhereInput | Prisma.PotholeWhereInput[];
    OR?: Prisma.PotholeWhereInput[];
    NOT?: Prisma.PotholeWhereInput | Prisma.PotholeWhereInput[];
    id?: Prisma.StringFilter<"Pothole"> | string;
    latitude?: Prisma.FloatFilter<"Pothole"> | number;
    longitude?: Prisma.FloatFilter<"Pothole"> | number;
    severity?: Prisma.FloatNullableFilter<"Pothole"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Pothole"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Pothole"> | Date | string;
};
export type PotholeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    severity?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PotholeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PotholeWhereInput | Prisma.PotholeWhereInput[];
    OR?: Prisma.PotholeWhereInput[];
    NOT?: Prisma.PotholeWhereInput | Prisma.PotholeWhereInput[];
    latitude?: Prisma.FloatFilter<"Pothole"> | number;
    longitude?: Prisma.FloatFilter<"Pothole"> | number;
    severity?: Prisma.FloatNullableFilter<"Pothole"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Pothole"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Pothole"> | Date | string;
}, "id">;
export type PotholeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    severity?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PotholeCountOrderByAggregateInput;
    _avg?: Prisma.PotholeAvgOrderByAggregateInput;
    _max?: Prisma.PotholeMaxOrderByAggregateInput;
    _min?: Prisma.PotholeMinOrderByAggregateInput;
    _sum?: Prisma.PotholeSumOrderByAggregateInput;
};
export type PotholeScalarWhereWithAggregatesInput = {
    AND?: Prisma.PotholeScalarWhereWithAggregatesInput | Prisma.PotholeScalarWhereWithAggregatesInput[];
    OR?: Prisma.PotholeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PotholeScalarWhereWithAggregatesInput | Prisma.PotholeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Pothole"> | string;
    latitude?: Prisma.FloatWithAggregatesFilter<"Pothole"> | number;
    longitude?: Prisma.FloatWithAggregatesFilter<"Pothole"> | number;
    severity?: Prisma.FloatNullableWithAggregatesFilter<"Pothole"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Pothole"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Pothole"> | Date | string;
};
export type PotholeCreateInput = {
    id?: string;
    latitude: number;
    longitude: number;
    severity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PotholeUncheckedCreateInput = {
    id?: string;
    latitude: number;
    longitude: number;
    severity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PotholeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.FloatFieldUpdateOperationsInput | number;
    longitude?: Prisma.FloatFieldUpdateOperationsInput | number;
    severity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PotholeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.FloatFieldUpdateOperationsInput | number;
    longitude?: Prisma.FloatFieldUpdateOperationsInput | number;
    severity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PotholeCreateManyInput = {
    id?: string;
    latitude: number;
    longitude: number;
    severity?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PotholeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.FloatFieldUpdateOperationsInput | number;
    longitude?: Prisma.FloatFieldUpdateOperationsInput | number;
    severity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PotholeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.FloatFieldUpdateOperationsInput | number;
    longitude?: Prisma.FloatFieldUpdateOperationsInput | number;
    severity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PotholeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PotholeAvgOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
};
export type PotholeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PotholeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PotholeSumOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    severity?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type PotholeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    severity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["pothole"]>;
export type PotholeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    severity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["pothole"]>;
export type PotholeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    severity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["pothole"]>;
export type PotholeSelectScalar = {
    id?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    severity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PotholeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "latitude" | "longitude" | "severity" | "createdAt" | "updatedAt", ExtArgs["result"]["pothole"]>;
export type $PotholePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Pothole";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        latitude: number;
        longitude: number;
        severity: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["pothole"]>;
    composites: {};
};
export type PotholeGetPayload<S extends boolean | null | undefined | PotholeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PotholePayload, S>;
export type PotholeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PotholeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PotholeCountAggregateInputType | true;
};
export interface PotholeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Pothole'];
        meta: {
            name: 'Pothole';
        };
    };
    /**
     * Find zero or one Pothole that matches the filter.
     * @param {PotholeFindUniqueArgs} args - Arguments to find a Pothole
     * @example
     * // Get one Pothole
     * const pothole = await prisma.pothole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PotholeFindUniqueArgs>(args: Prisma.SelectSubset<T, PotholeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PotholeClient<runtime.Types.Result.GetResult<Prisma.$PotholePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Pothole that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PotholeFindUniqueOrThrowArgs} args - Arguments to find a Pothole
     * @example
     * // Get one Pothole
     * const pothole = await prisma.pothole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PotholeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PotholeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PotholeClient<runtime.Types.Result.GetResult<Prisma.$PotholePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Pothole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PotholeFindFirstArgs} args - Arguments to find a Pothole
     * @example
     * // Get one Pothole
     * const pothole = await prisma.pothole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PotholeFindFirstArgs>(args?: Prisma.SelectSubset<T, PotholeFindFirstArgs<ExtArgs>>): Prisma.Prisma__PotholeClient<runtime.Types.Result.GetResult<Prisma.$PotholePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Pothole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PotholeFindFirstOrThrowArgs} args - Arguments to find a Pothole
     * @example
     * // Get one Pothole
     * const pothole = await prisma.pothole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PotholeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PotholeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PotholeClient<runtime.Types.Result.GetResult<Prisma.$PotholePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Potholes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PotholeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Potholes
     * const potholes = await prisma.pothole.findMany()
     *
     * // Get first 10 Potholes
     * const potholes = await prisma.pothole.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const potholeWithIdOnly = await prisma.pothole.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PotholeFindManyArgs>(args?: Prisma.SelectSubset<T, PotholeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PotholePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Pothole.
     * @param {PotholeCreateArgs} args - Arguments to create a Pothole.
     * @example
     * // Create one Pothole
     * const Pothole = await prisma.pothole.create({
     *   data: {
     *     // ... data to create a Pothole
     *   }
     * })
     *
     */
    create<T extends PotholeCreateArgs>(args: Prisma.SelectSubset<T, PotholeCreateArgs<ExtArgs>>): Prisma.Prisma__PotholeClient<runtime.Types.Result.GetResult<Prisma.$PotholePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Potholes.
     * @param {PotholeCreateManyArgs} args - Arguments to create many Potholes.
     * @example
     * // Create many Potholes
     * const pothole = await prisma.pothole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PotholeCreateManyArgs>(args?: Prisma.SelectSubset<T, PotholeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Potholes and returns the data saved in the database.
     * @param {PotholeCreateManyAndReturnArgs} args - Arguments to create many Potholes.
     * @example
     * // Create many Potholes
     * const pothole = await prisma.pothole.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Potholes and only return the `id`
     * const potholeWithIdOnly = await prisma.pothole.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PotholeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PotholeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PotholePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Pothole.
     * @param {PotholeDeleteArgs} args - Arguments to delete one Pothole.
     * @example
     * // Delete one Pothole
     * const Pothole = await prisma.pothole.delete({
     *   where: {
     *     // ... filter to delete one Pothole
     *   }
     * })
     *
     */
    delete<T extends PotholeDeleteArgs>(args: Prisma.SelectSubset<T, PotholeDeleteArgs<ExtArgs>>): Prisma.Prisma__PotholeClient<runtime.Types.Result.GetResult<Prisma.$PotholePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Pothole.
     * @param {PotholeUpdateArgs} args - Arguments to update one Pothole.
     * @example
     * // Update one Pothole
     * const pothole = await prisma.pothole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PotholeUpdateArgs>(args: Prisma.SelectSubset<T, PotholeUpdateArgs<ExtArgs>>): Prisma.Prisma__PotholeClient<runtime.Types.Result.GetResult<Prisma.$PotholePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Potholes.
     * @param {PotholeDeleteManyArgs} args - Arguments to filter Potholes to delete.
     * @example
     * // Delete a few Potholes
     * const { count } = await prisma.pothole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PotholeDeleteManyArgs>(args?: Prisma.SelectSubset<T, PotholeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Potholes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PotholeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Potholes
     * const pothole = await prisma.pothole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PotholeUpdateManyArgs>(args: Prisma.SelectSubset<T, PotholeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Potholes and returns the data updated in the database.
     * @param {PotholeUpdateManyAndReturnArgs} args - Arguments to update many Potholes.
     * @example
     * // Update many Potholes
     * const pothole = await prisma.pothole.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Potholes and only return the `id`
     * const potholeWithIdOnly = await prisma.pothole.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends PotholeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PotholeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PotholePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Pothole.
     * @param {PotholeUpsertArgs} args - Arguments to update or create a Pothole.
     * @example
     * // Update or create a Pothole
     * const pothole = await prisma.pothole.upsert({
     *   create: {
     *     // ... data to create a Pothole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pothole we want to update
     *   }
     * })
     */
    upsert<T extends PotholeUpsertArgs>(args: Prisma.SelectSubset<T, PotholeUpsertArgs<ExtArgs>>): Prisma.Prisma__PotholeClient<runtime.Types.Result.GetResult<Prisma.$PotholePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Potholes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PotholeCountArgs} args - Arguments to filter Potholes to count.
     * @example
     * // Count the number of Potholes
     * const count = await prisma.pothole.count({
     *   where: {
     *     // ... the filter for the Potholes we want to count
     *   }
     * })
    **/
    count<T extends PotholeCountArgs>(args?: Prisma.Subset<T, PotholeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PotholeCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Pothole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PotholeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PotholeAggregateArgs>(args: Prisma.Subset<T, PotholeAggregateArgs>): Prisma.PrismaPromise<GetPotholeAggregateType<T>>;
    /**
     * Group by Pothole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PotholeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends PotholeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PotholeGroupByArgs['orderBy'];
    } : {
        orderBy?: PotholeGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PotholeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPotholeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Pothole model
     */
    readonly fields: PotholeFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Pothole.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PotholeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Pothole model
 */
export interface PotholeFieldRefs {
    readonly id: Prisma.FieldRef<"Pothole", 'String'>;
    readonly latitude: Prisma.FieldRef<"Pothole", 'Float'>;
    readonly longitude: Prisma.FieldRef<"Pothole", 'Float'>;
    readonly severity: Prisma.FieldRef<"Pothole", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"Pothole", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Pothole", 'DateTime'>;
}
/**
 * Pothole findUnique
 */
export type PotholeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pothole
     */
    select?: Prisma.PotholeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pothole
     */
    omit?: Prisma.PotholeOmit<ExtArgs> | null;
    /**
     * Filter, which Pothole to fetch.
     */
    where: Prisma.PotholeWhereUniqueInput;
};
/**
 * Pothole findUniqueOrThrow
 */
export type PotholeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pothole
     */
    select?: Prisma.PotholeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pothole
     */
    omit?: Prisma.PotholeOmit<ExtArgs> | null;
    /**
     * Filter, which Pothole to fetch.
     */
    where: Prisma.PotholeWhereUniqueInput;
};
/**
 * Pothole findFirst
 */
export type PotholeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pothole
     */
    select?: Prisma.PotholeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pothole
     */
    omit?: Prisma.PotholeOmit<ExtArgs> | null;
    /**
     * Filter, which Pothole to fetch.
     */
    where?: Prisma.PotholeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Potholes to fetch.
     */
    orderBy?: Prisma.PotholeOrderByWithRelationInput | Prisma.PotholeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Potholes.
     */
    cursor?: Prisma.PotholeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Potholes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Potholes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Potholes.
     */
    distinct?: Prisma.PotholeScalarFieldEnum | Prisma.PotholeScalarFieldEnum[];
};
/**
 * Pothole findFirstOrThrow
 */
export type PotholeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pothole
     */
    select?: Prisma.PotholeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pothole
     */
    omit?: Prisma.PotholeOmit<ExtArgs> | null;
    /**
     * Filter, which Pothole to fetch.
     */
    where?: Prisma.PotholeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Potholes to fetch.
     */
    orderBy?: Prisma.PotholeOrderByWithRelationInput | Prisma.PotholeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Potholes.
     */
    cursor?: Prisma.PotholeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Potholes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Potholes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Potholes.
     */
    distinct?: Prisma.PotholeScalarFieldEnum | Prisma.PotholeScalarFieldEnum[];
};
/**
 * Pothole findMany
 */
export type PotholeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pothole
     */
    select?: Prisma.PotholeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pothole
     */
    omit?: Prisma.PotholeOmit<ExtArgs> | null;
    /**
     * Filter, which Potholes to fetch.
     */
    where?: Prisma.PotholeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Potholes to fetch.
     */
    orderBy?: Prisma.PotholeOrderByWithRelationInput | Prisma.PotholeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Potholes.
     */
    cursor?: Prisma.PotholeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Potholes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Potholes.
     */
    skip?: number;
    distinct?: Prisma.PotholeScalarFieldEnum | Prisma.PotholeScalarFieldEnum[];
};
/**
 * Pothole create
 */
export type PotholeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pothole
     */
    select?: Prisma.PotholeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pothole
     */
    omit?: Prisma.PotholeOmit<ExtArgs> | null;
    /**
     * The data needed to create a Pothole.
     */
    data: Prisma.XOR<Prisma.PotholeCreateInput, Prisma.PotholeUncheckedCreateInput>;
};
/**
 * Pothole createMany
 */
export type PotholeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Potholes.
     */
    data: Prisma.PotholeCreateManyInput | Prisma.PotholeCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Pothole createManyAndReturn
 */
export type PotholeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pothole
     */
    select?: Prisma.PotholeSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Pothole
     */
    omit?: Prisma.PotholeOmit<ExtArgs> | null;
    /**
     * The data used to create many Potholes.
     */
    data: Prisma.PotholeCreateManyInput | Prisma.PotholeCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Pothole update
 */
export type PotholeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pothole
     */
    select?: Prisma.PotholeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pothole
     */
    omit?: Prisma.PotholeOmit<ExtArgs> | null;
    /**
     * The data needed to update a Pothole.
     */
    data: Prisma.XOR<Prisma.PotholeUpdateInput, Prisma.PotholeUncheckedUpdateInput>;
    /**
     * Choose, which Pothole to update.
     */
    where: Prisma.PotholeWhereUniqueInput;
};
/**
 * Pothole updateMany
 */
export type PotholeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Potholes.
     */
    data: Prisma.XOR<Prisma.PotholeUpdateManyMutationInput, Prisma.PotholeUncheckedUpdateManyInput>;
    /**
     * Filter which Potholes to update
     */
    where?: Prisma.PotholeWhereInput;
    /**
     * Limit how many Potholes to update.
     */
    limit?: number;
};
/**
 * Pothole updateManyAndReturn
 */
export type PotholeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pothole
     */
    select?: Prisma.PotholeSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Pothole
     */
    omit?: Prisma.PotholeOmit<ExtArgs> | null;
    /**
     * The data used to update Potholes.
     */
    data: Prisma.XOR<Prisma.PotholeUpdateManyMutationInput, Prisma.PotholeUncheckedUpdateManyInput>;
    /**
     * Filter which Potholes to update
     */
    where?: Prisma.PotholeWhereInput;
    /**
     * Limit how many Potholes to update.
     */
    limit?: number;
};
/**
 * Pothole upsert
 */
export type PotholeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pothole
     */
    select?: Prisma.PotholeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pothole
     */
    omit?: Prisma.PotholeOmit<ExtArgs> | null;
    /**
     * The filter to search for the Pothole to update in case it exists.
     */
    where: Prisma.PotholeWhereUniqueInput;
    /**
     * In case the Pothole found by the `where` argument doesn't exist, create a new Pothole with this data.
     */
    create: Prisma.XOR<Prisma.PotholeCreateInput, Prisma.PotholeUncheckedCreateInput>;
    /**
     * In case the Pothole was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PotholeUpdateInput, Prisma.PotholeUncheckedUpdateInput>;
};
/**
 * Pothole delete
 */
export type PotholeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pothole
     */
    select?: Prisma.PotholeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pothole
     */
    omit?: Prisma.PotholeOmit<ExtArgs> | null;
    /**
     * Filter which Pothole to delete.
     */
    where: Prisma.PotholeWhereUniqueInput;
};
/**
 * Pothole deleteMany
 */
export type PotholeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Potholes to delete
     */
    where?: Prisma.PotholeWhereInput;
    /**
     * Limit how many Potholes to delete.
     */
    limit?: number;
};
/**
 * Pothole without action
 */
export type PotholeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pothole
     */
    select?: Prisma.PotholeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Pothole
     */
    omit?: Prisma.PotholeOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Pothole.d.ts.map