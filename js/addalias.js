import React, {Component} from 'react'
import { sendEvent, catchEvent, removeEvent, middleEvents } from './eventmodel'
import {Toast} from 'dialog-react'

export default class AddAlias extends Component {
    constructor() {
        super()
        this.titles = ['位置', '零件号', '名称', '别称']
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.show) Model.clear() //clear all inputs
    }

    getFooter() {
        let _footer = null
        let _parts = this.props.parts
        if (_parts) _footer = (
            <Footer
                parts={_parts}/>
        )
        else _footer = <div />
        return _footer
    }

    render() {
        let _titles = this.titles
        let _show = this.props.show

        return (
            <div
                className="container-addalias"
                style={{display: _show ? "block" : "none"}}>
                <Header
                    titles={_titles} />
                {this.getFooter()}
                <div
                    className='close'
                    onClick={() => sendEvent(middleEvents.toggleAddAlias)}/>
                </div>
        )
    }
}

class Row extends Component {
    constructor() {
        super()
        this.widths = ['10%', '16%', '33%', '41%']
    }
}

class Header extends Row {
    getTitles() {
        let _widths = this.widths
        let _titles = this.props.titles

        return _widths.map((item, index) => {
            let _width = _widths[index]
            return (
                <div
                    key={index}
                    className='item'
                    style={{width: _width}} dangerouslySetInnerHTML={{__html: _titles[index]}} />
            )
        })
    }

    render() {
        return (
            <div
                className='container-header'>
                {this.getTitles()}
            </div>
        )
    }
}

class Footer extends Row {
    constructor() {
        super()
        this.state = {
            showDialog: false
        }
        this.isSaving = false //保存中则不允许多次点击保存
    }

    getRows() {
        let _parts = this.props.parts
        return _parts.map((item, index) => {
            return (
                <FooterRow
                    key={index}
                    part={item} />
            )
        })
    }

    save() {
        let _name = Model.new_informal_name
        let _hasName = _name && _name.length > 0

        if(!this.isSaving && _hasName) this.setState({showDialog: true}, () => this.isSaving = true)
        else if(!this.isSaving && !_hasName) alert("请输入内容或点击关闭按钮。")
    }

    render() {
        let _parts = this.props.parts
        let _save = this.save.bind(this)

        return (
            <div
                className='container-footer'>
                {this.getRows()}
                <input
                    className='addalias-save'
                    type='button'
                    defaultValue='保存'
                    onClick={_save}/>
                <Toast
                    content="保存成功"
                    show={this.state.showDialog}
                    long={1}
                    close={() => this.setState({showDialog: false}, () => {
                        this.isSaving = false
                        sendEvent(middleEvents.toggleAddAlias)
                        Model.new_informal_name = null
                    })} />
            </div>
        )
    }
}

class FooterRow extends Row {
    getItems() {
        let _widths = this.widths
        let _partGroup = this.props.part

        return _widths.map((item, index) => {
            let _width = _widths[index]
            let _part = _partGroup[0]
 //           console.log(_part)
            let _content = ""
            switch (index) {
                case 0: _content = _part.num
                break
                case 1: _content = _part.pid
                break
                case 2: _content = _part.label
                break
                case 3: _content = (
                    <input
                        className='addalias-input'
                        onBlur={Model.save}
                        onChange={e => Model.change(_part.pid, e.target.value)}/>
                )
                break
            }
            return (
                <div
                    key={index}
                    className='item'
                    style={{width: _width}}>
                    {_content}
                </div>
            )
        })
    }

    render() {
        return (
            <div
                className='container-footerrow'>
                {this.getItems()}
            </div>
        )
    }
}

class Model {
    //每次输入都保存输入内容与pid，一是用来保存参数，二是用来做最后一个保存动作的准备
    static change(pid, name) {
        if(pid) Model.pid = pid
        if(name) Model.new_informal_name = name
    }

    //所有保存都经过这个
    static save(callback) {
        if(!Model.new_informal_name || Model.new_informal_name.length < 1) return

        let _url = '/engine/informal_parts_add'
        let _obj = {
            pid: Model.pid,
            new_informal_name: Model.new_informal_name,
            brandCode: params.code
        }

        postAjax(_url, _obj, res => {
            if(callback instanceof Function) callback(res)
        })
    }

    static clear() {
        $(".addalias-input").each(function() {
            $(this).val("")
        })
    }
}
