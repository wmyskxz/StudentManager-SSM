<body class="easyui-layout">
        <div data-options="region:'center',title:'Center'">
            <table id="list_data" class="easyui-datagrid" style="width:100%;height:auto;">
                <thead>
                    <tr>
                        <th field="name" width="100">商品</th>
                        <th field="address" width="100">查询</th>
                        <th field="sex" width="100">删除</th>
                        <th field="idCard" width="100">从大的</th>
                        <th field="birth_Date" width="100">是非常</th>
                        <th field="issue_Date" width="100">的</th>
                        <th field="permit_Type" width="100">地方</th>
                        <th field="expiration_Date" width="100">让他</th>
                        <th field="carNum" width="100">不能</th>
                        <th field="id" width="100">发v</th>
                    </tr>
                </thead>
            </table>
        </div>
    </body>
    <script>
    //×Ô¶¯·¢ÇëÇóµ½url£¬²¢°Ñ·µ»ØµÄÊý¾Ý×Ô¶¯ÌîÈë
        $('#list_data').datagrid({
            url: 'veigar/testJson',
            dataType:'JSONP',
            rownumbers: true,
            singleSelect: true,
            pagination: true,
            idField: 'id',
            fitColumns: true,
            fit: true,
            nowarp: false,
            border: false,
            pageSize: 5,
            pageList: [5, 10],
        });
    </script>
