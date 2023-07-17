export type ButtonPropType ={ 
    label: string, 
    logo?: any, 
    className?: string, 
    logoClass?: string, 
    lableClass?: string, 
    onClick: (e : React.MouseEvent<HTMLElement>) => {}, 
    disabled?: boolean
}