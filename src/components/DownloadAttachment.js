import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DownloadAttachment({ bugId }) {
    const [attachments, setAttachments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchBugDetails() {
            try {
                const response = await axios.get(`http://localhost:8080/bugs/${bugId}`);
                if (response.data.attachments && response.data.attachments.length > 0) {
                    const fetchedAttachments = response.data.attachments.map((attachment, index) => ({
                        ...attachment,
                        url: byteArrayToBlobUrl(attachment.attachment, attachment.attachmentExt),
                        extension: attachment.attachmentExt // Use the extension from the database
                    }));
                    setAttachments(fetchedAttachments);
                } else {
                    setError('No attachments found for this bug.');
                }
            } catch (error) {
                console.error('Failed to fetch bug details:', error);
                setError('Failed to fetch attachments.');
            }
        }

        fetchBugDetails();
    }, [bugId]);

    function byteArrayToBlobUrl(byteArray, fileExtension) {
        const byteArrayInFormat = new Uint8Array(atob(byteArray).split('').map(char => char.charCodeAt(0)));
        const blob = new Blob([byteArrayInFormat], { type: getMimeType(fileExtension) });
        return URL.createObjectURL(blob);
    }

    function getMimeType(extension) {
        switch(extension.toLowerCase()) {
            case 'pdf': return 'application/pdf';
            case 'xlsx': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            case 'txt': return 'text/plain';
            case 'jpg': case 'jpeg': return 'image/jpeg';
            case 'png': return 'image/png';
            default: return 'application/octet-stream'; // A generic binary data MIME type
        }
    }

    return (
        <div>
            <h1>Download Attachments</h1>
            {attachments.length > 0 ? attachments.map((attachment, index) => (
                <div key={index}>
                    <a href={attachment.url} download={`Attachment_${attachment.attachmentId}.${attachment.extension}`}>
                        Download Attachment {attachment.attachmentId}
                    </a>
                </div>
            )) : <p>{error}</p>}
        </div>
    );
}

export default DownloadAttachment;
