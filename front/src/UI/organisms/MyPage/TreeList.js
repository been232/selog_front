import { useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ContainedButton from '../../atoms/Commons/ContainedButton';
import { Box, Button, IconButton, TextField, Typography, Divider } from '@mui/material';

export default function TreeList() {
    const [isEdit, setIsEdit] = useState(false); // 카테고리 편집 상태 확인
    const [id, setId] = useState(); // 추가: 상위 카테고리의 id , 변경/삭제: 자기자신의 id
    const [value, setValue] = useState(''); // TextField 내의 값
    const [visible, setVisible] = useState(false); // TextField의 보여짐 여부 확인
    const [handle, setHandle] = useState(''); // 이벤트가 어떤 이벤트인지 알려주는 변수 (추가, 변경, 삭제)

    const data = {
        "id": id,
        "name": value
    }

    const handleIsEdit = () => {
        setIsEdit(!isEdit);
        if (visible) {
            setVisible(!visible);
        }
    };

    const handleAdd = (id) => {
        setHandle('추가');
        setVisible(!visible);
        setId(id);
    };

    const handleUpdate = (id) => {
        setHandle('변경');
        setVisible(!visible);
        setId(id);
    };

    const handleDelete = (id) => {
        setHandle('삭제');
        setId(id);
        console.log("삭제 완료", id);
    };

    const handleProcess = () => {
        // 추가 시에는 response 값으로 '정보처리기사'가 추가된 카테고리 목록이 필요함.
        // 삭제 시에는 response 값으로 '정보보안기사'가 삭제된 카테고리 목록이 필요함.
        // 변경 시에는 response 값으로 '앱'이 'App'으로 변경된 카테고리 목록이 필요함.
        setVisible(!visible);
        if (value === "") {
            return;
        }

        if (handle === '추가') {
            console.log("추가 완료", data);

        } else if (handle === '변경') {
            console.log("변경 완료", data);

        } else {
            console.log("ㅇㅇㅇ");
        }

        //setResponse()
        console.log(response);
    };

    const [response, setResponse] = useState({
        "success": true,
        "data": [
            {
                "id": 1,
                "name": "전체",
                "count": 5,
                "child": [
                    {
                        "id": 2,
                        "name": "앱",
                        "count": 1,
                        "child": [
                            {
                                "id": 4,
                                "name": "IOS",
                                "count": 1
                            },
                            {
                                "id": 5,
                                "name": "안드로이드",
                                "count": 1
                            },
                        ]
                    },
                    {
                        "id": 3,
                        "name": "정보처리기사",
                        "count": 0,
                        "child": [
                        ]
                    }
                ]
            },
        ]
    });

    return (
        <Box sx={{ height: 240, flexGrow: 1, maxWidth: 400 }}>
            <Box sx={{ display: "flex", marginLeft: 9, marginBottom: 1 }} >
                <Typography sx={{ alignContent: "center", fontSize: "15px", marginRight: 2 }}>* 카테고리 *</Typography>
                <ContainedButton content="Edit" fontSize="11px" handleClick={handleIsEdit}></ContainedButton>
            </Box>
            <Divider />
            <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 240, flexGrow: 1, maxWidth: 400, marginTop: 1 }}
            >
                {response.data.map(function (val, i) {
                    return (<Box sx={{ display: "flex", flexWrap: "nowrap" }} key={i}>
                        <TreeItem
                            nodeId={val.name}
                            label={val.name}
                        >
                            {val.child.map(function (level2, i) {
                                return (<Box sx={{ display: "flex", flexWrap: "nowrap" }} key={i}>
                                    <TreeItem
                                        nodeId={level2.name}
                                        label={level2.name}
                                    >
                                        {level2.child.map(function (level3, i) {
                                            return (<Box sx={{ display: "flex", flexWrap: "nowrap" }} key={i}>
                                                <TreeItem
                                                    nodeId={level3.name}
                                                    label={level3.name}
                                                />
                                                {(isEdit) ?
                                                    (<Box sx={{ float: "right" }}>
                                                        <IconButton size="small" onClick={() => handleUpdate(level3.id)}>
                                                            <ChangeCircleIcon fontSize="inherit" />
                                                        </IconButton>
                                                        <IconButton size="small" onClick={() => handleDelete(level3.id)}>
                                                            <DeleteIcon fontSize="inherit" />
                                                        </IconButton>
                                                    </Box>) : ("")
                                                }
                                            </Box>)
                                        })}</TreeItem>
                                    {(isEdit) ?
                                        (<Box sx={{ float: "right" }}>
                                            <IconButton size="small" onClick={() => handleAdd(val.id)}>
                                                <AddCircleOutlineIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleUpdate(level2.id)}>
                                                <ChangeCircleIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDelete(level2.id)}>
                                                <DeleteIcon fontSize="inherit" />
                                            </IconButton>
                                        </Box>) : ("")
                                    }
                                </Box>)
                            })}
                        </TreeItem>
                        {(isEdit) ?
                            (
                                <Box sx={{ float: "right" }}>
                                    <IconButton size="small" onClick={() => handleAdd(val.id)}>
                                        <AddCircleOutlineIcon fontSize="inherit" />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => handleUpdate(val.id)}>
                                        <ChangeCircleIcon fontSize="inherit" />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => handleDelete(val.id)}>
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </Box>
                            ) : ("")
                        }
                    </Box>)
                })}
                {(visible) ?
                    <Box sx={{ marginLeft: 2 }}>
                        <TextField onChange={(event) => setValue(event.target.value)}></TextField>
                        <Button size="small" onClick={() => handleProcess()}>확인</Button>
                    </Box> : ""
                }

            </TreeView>
        </Box>
    );
}
