import React from 'react'
import { FaTrash } from 'react-icons/fa'
import DeleteVoucher from '../DeleteVoucher/DeleteVoucher'
import VoucherEditModal from "../VoucherEditModal/VoucherEditModal"

const ListVoucher = ({ currentVoucher }) => {
    return (
        <>
            {currentVoucher && currentVoucher.map((Voucher) => {
                return (
                    <tr key={Voucher._id}>
                        <td>{Voucher.name}</td>
                        <td>{Voucher.usage}</td>
                        <td>{Voucher.percent}</td>
                        <td>{Voucher.expired_date}</td>
                        {Voucher.deleted === 1 ? <td>Deleted</td> : <td>Availability</td>}
                        <td>
                            <div className='edit_icon'>
                                <VoucherEditModal idDetail={Voucher._id} nameDetail={Voucher.name} />
                            </div>
                            <div className='edit_icon'>
                                <DeleteVoucher idDetail={Voucher._id} nameDetail={Voucher.name} />
                            </div>
                        </td>

                    </tr>

                )
            })
            }
        </>
    )
}

export default ListVoucher