import { useState, useEffect } from 'react';    

interface template {
    id: number;
    text: string;
}

export function useTemplates(text: string) {
    const[templates, setTemplates] = useState<template[]>([]);

    useEffect(() => {fetchTemplates();}, []);


    const fetchTemplates = async () => {
        try {
        const response = await fetch(`/api/templates`)
        const data = await response.json();
        setTemplates(data);
    } catch (error){
        console.error("Failed to fetch templates:", error);
    }

    };

    const addTemplate = async (text:string) => {
        const response = await fetch(`/api/templates`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({text})
        });
        const newTemplate = await response.json();
        setTemplates([...templates, newTemplate]);
        };

    const deleteTemplate = async (id: number) => {
        try {
        const response = await fetch(`/api/templates?id=${id}`, {
            method: 'DELETE',
        });
        if(response.ok) {
            setTemplates(templates.filter(templates => templates.id !== id))
        }
        } catch (error) {
            console.error(error);
        }
    };

    return {      
        templates,
        fetchTemplates,
        deleteTemplate,
        addTemplate  
    }
    }


