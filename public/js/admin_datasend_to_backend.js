function deleteCall(id, url, attributeKey) {
    const deleteFabricBtn = document.querySelectorAll(id);
    deleteFabricBtn.forEach(el => {
        el.addEventListener("click", async (ele) => {
            await axios({
                method: "DELETE",
                url: url,
                data: {
                    id: el.getAttribute(attributeKey)
                }
            }).then((data) => {
                if (data.data.status === 200) {
                    window.location.reload();
                }
            }).catch(err => {
                alert("please reload");
            })
        })
    })
}

if (window.location.pathname.split("/")[2] === "dashboard-fabric") {
    $("#add-fabric")[0].addEventListener("click", async (ele) => {
        ele.preventDefault();
        const fabric = $("#fabric")[0].value;
        const price = $("#price")[0].value;

        await axios({
            method: "POST",
            url: "/api/v1/admin_data_controller/add_fabric",
            data: {
                fabric: fabric,
                price: price
            }
        }).then((data) => {
            if (data.data.status === 200) {
                window.location.reload();
            }
        }).catch(err => {
            console.log(err)
        })
    })


    const deleteFabricBtn = document.querySelectorAll("#delete-fabric");
    deleteFabricBtn.forEach(el => {
        el.addEventListener("click", async (ele) => {
            await axios({
                method: "DELETE",
                url: "/api/v1/admin_data_controller/delete_fabric",
                data: {
                    id: el.getAttribute("fabric-id")
                }
            }).then((data) => {
                if (data.data.status === 200) {
                    window.location.reload();
                }
            }).catch(err => {
                alert("please reload");
            })
        })
    })

} else if (window.location.pathname.split("/")[2] === "dashboard-material-type") {
    $("#add-cloth")[0].addEventListener("click", async (ele) => {
        ele.preventDefault();
        const cloth_type = $("#cloth-type")[0].value;
        const front = $("#image-front")[0].files[0];
        const back = $("#image-back")[0].files[0];
        const description = $("#description")[0].value;
        const price = $("#price")[0].value;

        console.log(cloth_type, front, back, price, description)

        const newFormData = new FormData();
        newFormData.append("cloth_type", cloth_type);
        newFormData.append("description", description);
        newFormData.append("price", price);
        newFormData.append("front", front);
        newFormData.append("back", back);

        await axios({
            method: "POST",
            url: "/api/v1/admin_data_controller/add_cloth_type",
            data: newFormData
        }).then((data) => {
            if (data.data.status === 200) {
                window.location.reload();
            }
        }).catch(err => {
            console.log(err)
        })
    })

    // deleteCall("#delete-cloth", "/api/v1/admin_data_controller/delete_fabric", "cloth_type_id");
    const deleteFabricBtn = document.querySelectorAll("#delete-cloth");
    deleteFabricBtn.forEach(el => {
        el.addEventListener("click", async (ele) => {
            await axios({
                method: "DELETE",
                url: "/api/v1/admin_data_controller/delete_cloth_type",
                data: {
                    id: el.getAttribute("cloth_type_id")
                }
            }).then((data) => {
                console.log(data)
                if (data.data.status === 200) {
                    window.location.reload();
                }
            }).catch(err => {
                alert("please reload");
            })
        })
    })
}