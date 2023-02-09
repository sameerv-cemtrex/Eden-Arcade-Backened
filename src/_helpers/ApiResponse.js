module.exports = {
    apiResponse: (res, status, code, description = null, error = null, data = [], paginatedData = {}, linksData = {}) => {
        let response = {
            status: status, //true for success and false for failure
            code: code,      //http status code
            message: description, //response message
            errors: error        // errors
        }
        if (code == 500) {
            response.message = description;
        } else if (code >= 200 && code < 300) {
            if (Object.keys(paginatedData).length > 0) {
                if (paginatedData.meta) {
                    response.meta = paginatedData.meta;
                }
            }
            if (Object.keys(linksData).length > 0) {
                if (linksData.links) {
                    response.links = linksData.links;
                }
            }
            response.data = data;
        } else if (data.errors) {
            // console.log(data);
            response.errors = data.errors;
        }
        // console.log(response)
        res.status(code).json(response);
    },

    generatePaginateData: async (total, page, limit, skip) => {
        let data = {}
        let metaData = {
            "total": total,
            "current_page": page,
            "last_page": Math.ceil(total / limit),
            "per_page": limit,
        }
        data['meta'] = metaData;
        return data;
    },

    generateLinksData: async (firstPageUrl, lastPageUrl, nextPageUrl, prevPageUrl) => {
        let data = {}
        let linksData = {
            "first_page_url": firstPageUrl,
            "last_page_url": lastPageUrl,
            "prev_page_url": prevPageUrl,
            "next_page_url": nextPageUrl,
        }
        data['links'] = linksData;
        return data;
    }
};

const ok_response_data =
{
    "status": true,
    "code": 200,
    "message": "Data fetched successfully.",
    "errors": null,
    "meta": {
        "total": 2,
        "current_page": 1,
        "last_page": 1,
        "per_page": 15,
        "from": 1,
        "to": 3
    },
    "data": [],
    "links": {
        "first_page_url": "http://localhost:8000/api/v1/dish-categories?dish_status=1&restaurant_id=35&page=1",
        "next_page_url": null,
        "previous_page_url": null,
        "last_page_url": "http://localhost:8000/api/v1/dish-categories?dish_status=1&restaurant_id=35&page=1"
    }
}

const error_response_data = {
    "status": false,
    "code": 422,
    "message": "Validation failed.",
    "errors": {
    }
}