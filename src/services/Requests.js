export async function getRoute(route)
{
    return await fetch(`https://localhost:7117/api/${route}/Get${route}s`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        error.error = true;
        console.error('Error:', error);
        return error;
    });
}

export async function getRouteNota()
{
    return await fetch(`https://localhost:7117/api/Revision/GetRevision`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        error.error = true;
        console.error('Error:', error);
        return error;
    });
}

export async function deleteRoute(route, id)
{
    return await fetch(`https://localhost:7117/api/${route}/Delete${route}?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.ok)
    .catch(() => {
        return false;
    });
}

export async function postRoute(route, data)
{
    return await fetch(`https://localhost:7117/api/${route}/Post${route}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.ok)
    .catch(error => {
        error.error = true;
        console.error('Error:', error);
        return error;
    });
}

export async function putRoute(route, data, id)
{
    return await fetch(`https://localhost:7117/api/${route}/Put${route}?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
        error.error = true;
        console.error('Error:', error);
        return error;
    });
}

export async function postRouteReview(data, code)
{
    return await fetch(`https://localhost:7117/api/Revision/PostRevision?code=${code}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.ok)
    .catch(error => {
        error.error = true;
        console.error('Error:', error);
        return error;
    });
}


