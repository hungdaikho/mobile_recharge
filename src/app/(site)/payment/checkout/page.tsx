import SubHeader from '@/components/layout/sub.header'
import React from 'react'
import CheckoutSection from './payment'

type Props = {}

const page = (props: Props) => {
    return (
        <><SubHeader content="Payment Steps" /><CheckoutSection /></>
    )
}

export default page