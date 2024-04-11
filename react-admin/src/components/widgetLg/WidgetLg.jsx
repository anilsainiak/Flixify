import React from 'react'
import './widgetLg.css'

export default function WidgetLg() {
    const Button=({type})=>{
        return <button className={"widgetLgButton "+type}>{type}</button>
    };
  return (
    <div className='widgetLg'>
        <h3 className="widgetLgTitle">Latest Transaction</h3>
        <table className="widgetLgTable">
            <tbody>

            <tr className="widgetLgTr">
                <th className="widgetLgTh">Customer</th>
                <th className="widgetLgTh">Date</th>
                <th className="widgetLgTh">Amount</th>
                <th className="widgetLgTh">Status</th>
            </tr>
            <tr className="widgetLgTr">
                <td className="widgetLgUser">
                    <img src="https://miro.medium.com/v2/resize:fit:1200/1*9ldt4UL_uUGWTwnL8_XyLA.jpeg" alt="" className="widgetLgImg" />
                    <span className="widgetLgName">Anil Saini</span>
                </td>
                <td className="widgetLgDate">June 2,2021</td>
                <td className="widgetlgAmount">$150.00</td>
                <td className="widgetLgStatus"><Button type="Approved"/></td>
            </tr>
            <tr className="widgetLgTr">
                <td className="widgetLgUser">
                    <img src="https://miro.medium.com/v2/resize:fit:1200/1*9ldt4UL_uUGWTwnL8_XyLA.jpeg" alt="" className="widgetLgImg" />
                    <span className="widgetLgName">Anil Saini</span>
                </td>
                <td className="widgetLgDate">June 2,2021</td>
                <td className="widgetlgAmount">$150.00</td>
                <td className="widgetLgStatus"><Button type="Declined"/></td>
            </tr>
            <tr className="widgetLgTr">
                <td className="widgetLgUser">
                    <img src="https://miro.medium.com/v2/resize:fit:1200/1*9ldt4UL_uUGWTwnL8_XyLA.jpeg" alt="" className="widgetLgImg" />
                    <span className="widgetLgName">Anil Saini</span>
                </td>
                <td className="widgetLgDate">June 2,2021</td>
                <td className="widgetlgAmount">$150.00</td>
                <td className="widgetLgStatus"><Button type="Approved"/></td>
            </tr>
            <tr className="widgetLgTr">
                <td className="widgetLgUser">
                    <img src="https://miro.medium.com/v2/resize:fit:1200/1*9ldt4UL_uUGWTwnL8_XyLA.jpeg" alt="" className="widgetLgImg" />
                    <span className="widgetLgName">Anil Saini</span>
                </td>
                <td className="widgetLgDate">June 2,2021</td>
                <td className="widgetlgAmount">$150.00</td>
                <td className="widgetLgStatus"><Button type="Pending"/></td>
            </tr>
            <tr className="widgetLgTr">
                <td className="widgetLgUser">
                    <img src="https://miro.medium.com/v2/resize:fit:1200/1*9ldt4UL_uUGWTwnL8_XyLA.jpeg" alt="" className="widgetLgImg" />
                    <span className="widgetLgName">Anil Saini</span>
                </td>
                <td className="widgetLgDate">June 2,2021</td>
                <td className="widgetlgAmount">$150.00</td>
                <td className="widgetLgStatus"><Button type="Approved"/></td>
            </tr>
            </tbody>
        </table>
    </div>
  )
}
