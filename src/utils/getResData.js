export function getDatedData(resumeData, groupFlag){

    let datedCategories = ['job', 'education', 'volunteer'];
    
    let returnData = [];
    for (let cat of datedCategories) {
        let catObj = {};
        var catData = resumeData[cat];
        if (cat == 'job'){
            catObj.data = catData.map(function(item){
                item.title = item.position;
                item.organization = item.company;
                return (item);
            });
            catObj.category_title = "Work Experience";
        }
        if (cat == 'education'){
            catObj.data = catData.map(function(item){
                item.title = `${item.degreeType} in ${item.major}`;
                item.organization = item.institution;
                return (item);
            });
            catObj.category_title = "Education";
        }
        if (cat == 'volunteer'){
            catObj.data = catData.map(function(item){
                item.title = item.position;
                item.organization = item.organization;
                return (item);
            });
            catObj.category_title = "Volunteering";
        }
        catObj.data = catObj.data.map(function(item){
            item.icon = cat;
            item.endDate = item.endDate ? new Date(item.endDate) : null;
            item.startDate = new Date(item.startDate);
            return item;
        });


        if (groupFlag == true || groupFlag == null){
            returnData.push(catObj);    
        }
        else {
            catObj.category_title = "Work, Education, and Volunteering";
            try{
                returnData[0].data = returnData[0].data.concat(catObj.data);
            }
            catch(err){
                returnData.push(catObj);
            }
        }
    }

    return sortCategoryData(returnData);
}

export function sortCategoryData(catData) {
    for(var cat of catData) {
        cat.data.sort(function(a,b){
            // If there's no end date, it's a current activity and should be first on the list
            if (!a.endDate){
                return -1
            }
            if (!b.endDate) {
                return 1
            }
            return b.endDate - a.endDate;

        });
    }
    return catData;
}
