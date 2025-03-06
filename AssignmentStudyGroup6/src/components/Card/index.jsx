import React from 'react';
import Button from '../Button';

const Card = ({title, description, createdAt, onDelete, onEdit}) => {
  const date = new Date(createdAt).getDate();
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const month = monthNames[new Date(createdAt).getMonth()];
  const year = new Date(createdAt).getFullYear();

  return (
    <div className="shadow-md p-4 flex flex-col bg-white gap-1.5 min-h-4 max-h-4/6 rounded-xl">
      <h3 className="font-bold break-words">{title}</h3>
      <p className="w-full max-h-20 overflow-y-auto break-words">
        {description}
      </p>
      <p>{`${date} ${month} , ${year}`}</p>
      <div className="flex flex-col gap-1.5 sm:flex-row justify-end">
        <Button message="Edit" color="blue" onClick={onEdit} />
        <Button message="Delete" color="red" onClick={onDelete} />
      </div>
    </div>
  );
};

export default Card;
